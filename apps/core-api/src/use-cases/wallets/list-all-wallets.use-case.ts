import {
  type IFindAllByUserIDWalletsRepository,
  type IFindByWalletIDStockTransactionsRepository,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type RepositoryError,
  type Stock,
  type StockTransaction,
  UseCase,
  type User,
  type Wallet
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace ListAllWalletsUseCaseDTO {
  export type Parameters = Readonly<{
    user: Pick<User, 'id'>
  }>

  export type StockInvestment = Pick<Stock, 'id' | 'symbol'> & {
    shareCount: number
    averagePurchasePriceInCents: number
    currentMarketPriceInCents: number
    totalInvestmentValueInCents: number
  }

  export type WalletWithStockInvestments = {
    wallet: Pick<Wallet, 'id' | 'name'>
    stockAggregatedInvestments: StockInvestment[]
  }

  export type ResultFailure = Readonly<RepositoryError>
  export type ResultSuccess = Readonly<{ walletList: WalletWithStockInvestments[] }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class ListAllWalletsUseCase extends UseCase<
  ListAllWalletsUseCaseDTO.Parameters,
  ListAllWalletsUseCaseDTO.ResultFailure,
  ListAllWalletsUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly walletsRepository: IFindAllByUserIDWalletsRepository,
    private readonly stockTransactionsRepository: IFindByWalletIDStockTransactionsRepository
  ) {
    super(loggerProvider)
  }

  protected async performOperation({
    user
  }: ListAllWalletsUseCaseDTO.Parameters): ListAllWalletsUseCaseDTO.Result {
    const walletsResult = await this.walletsRepository.findAllByUserID({ user: { id: user.id } })
    if (walletsResult.isFailure()) {
      return failure(walletsResult.value)
    }

    const { wallets } = walletsResult.value

    if (wallets.length === 0) {
      return success({ walletList: [] })
    }

    const walletList: ListAllWalletsUseCaseDTO.WalletWithStockInvestments[] = []

    for (const wallet of wallets) {
      const findStockTxResult = await this.stockTransactionsRepository.findByWalletID({
        wallet: { id: wallet.id },
        isDisposal: false
      })

      if (findStockTxResult.isFailure()) {
        return failure(findStockTxResult.value)
      }

      const { stocks } = findStockTxResult.value
      const stockAggregatedInvestments = this.aggregateStockInvestments(stocks)

      walletList.push({
        wallet: {
          id: wallet.id,
          name: wallet.name
        },
        stockAggregatedInvestments
      })
    }

    return success({ walletList })
  }

  private aggregateStockInvestments(
    stocks: Array<
      Pick<Stock, 'id' | 'symbol' | 'currentMarketPriceInCents'> & {
        transactions: Array<Pick<StockTransaction, 'acquisitionPriceInCents'>>
      }
    >
  ): ListAllWalletsUseCaseDTO.StockInvestment[] {
    const aggregatedByStock = new Map<string, ListAllWalletsUseCaseDTO.StockInvestment>()

    for (const stock of stocks) {
      const stockId = stock.id.value
      const symbol = stock.symbol
      const currentMarketPrice = stock.currentMarketPriceInCents || 0

      if (!aggregatedByStock.has(stockId)) {
        aggregatedByStock.set(stockId, {
          id: stock.id,
          symbol,
          shareCount: 0,
          averagePurchasePriceInCents: 0,
          currentMarketPriceInCents: currentMarketPrice,
          totalInvestmentValueInCents: 0
        })
      }

      const stockAggregate = aggregatedByStock.get(stockId)!

      for (const transaction of stock.transactions) {
        const shareCount = 1
        stockAggregate.shareCount += shareCount

        const currentTotalCost =
          stockAggregate.averagePurchasePriceInCents * (stockAggregate.shareCount - shareCount)
        const transactionCost = transaction.acquisitionPriceInCents * shareCount
        const newTotalCost = currentTotalCost + transactionCost

        stockAggregate.averagePurchasePriceInCents = Math.floor(
          newTotalCost / stockAggregate.shareCount
        )
      }

      stockAggregate.totalInvestmentValueInCents =
        stockAggregate.shareCount * stockAggregate.currentMarketPriceInCents
    }

    return Array.from(aggregatedByStock.values())
  }
}
