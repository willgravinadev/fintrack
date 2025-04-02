import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { Stock } from '../../models/stock.model'
import type { StockTransaction } from '../../models/stock-transaction.model'
import type { Wallet } from '../../models/wallet.model'
import type { Either } from '@fintrack/utils'

export namespace FindByWalletIDStockTransactionsRepositoryDTO {
  export type Parameters = Readonly<{
    wallet: Pick<Wallet, 'id'>
    isDisposal: boolean
  }>

  export type ResultFailure = Readonly<RepositoryError>
  export type ResultSuccess = Readonly<{
    stocks: Array<
      Pick<Stock, 'id' | 'symbol' | 'currentMarketPriceInCents' | 'logoURL'> & {
        transactions: Array<
          Pick<
            StockTransaction,
            | 'acquisitionAt'
            | 'acquisitionPriceInCents'
            | 'disposalAt'
            | 'disposalPriceInCents'
            | 'id'
            | 'investor'
            | 'wallet'
          >
        >
      }
    >
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IFindByWalletIDStockTransactionsRepository {
  findByWalletID(
    parameters: FindByWalletIDStockTransactionsRepositoryDTO.Parameters
  ): FindByWalletIDStockTransactionsRepositoryDTO.Result
}
