import type { Database } from '../database'

import {
  type CreateStockTransactionsRepositoryDTO,
  DateTime,
  type FindByStockIDStockTransactionsRepositoryDTO,
  type FindByWalletIDStockTransactionsRepositoryDTO,
  type ICreateStockTransactionsRepository,
  ID,
  type IFindByStockIDStockTransactionsRepository,
  type IFindByWalletIDStockTransactionsRepository,
  type ISendLogErrorLoggerProvider,
  type IUpdateDisposalStockTransactionsRepository,
  RepositoryError,
  RepositoryExternalName,
  RepositoryNames,
  StockTransactionsRepositoryMethods,
  type UpdateDisposalStockTransactionsRepositoryDTO
} from '@fintrack/domain'
import { failure, success } from '@fintrack/utils'

export class StockTransactionsPrismaRepository
  implements
    ICreateStockTransactionsRepository,
    IFindByStockIDStockTransactionsRepository,
    IFindByWalletIDStockTransactionsRepository,
    IUpdateDisposalStockTransactionsRepository
{
  constructor(
    private readonly loggerProvider: ISendLogErrorLoggerProvider,
    private readonly database: Database
  ) {}

  public async create(
    parameters: CreateStockTransactionsRepositoryDTO.Parameters
  ): CreateStockTransactionsRepositoryDTO.Result {
    try {
      const { stockTransaction } = parameters

      await this.database.prisma.stockTransaction.create({
        data: {
          id: stockTransaction.id.value,
          stockID: stockTransaction.stock.id.value,
          walletID: stockTransaction.wallet.id.value,
          investorID: stockTransaction.investor.id.value,
          acquisitionAt: stockTransaction.acquisitionAt.value,
          acquisitionPriceInCents: stockTransaction.acquisitionPriceInCents,
          disposalAt: stockTransaction.disposalAt?.value,
          disposalPriceInCents: stockTransaction.disposalPriceInCents,
          createdAt: stockTransaction.createdAt.value,
          updatedAt: stockTransaction.updatedAt.value,
          deletedAt: stockTransaction.deletedAt?.value
        }
      })

      return success(null)
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.STOCK_TRANSACTIONS,
          method: StockTransactionsRepositoryMethods.CREATE,
          externalName: RepositoryExternalName.PRISMA
        }
      })
      this.loggerProvider.sendLogError({
        message: repositoryError.errorMessage,
        value: repositoryError
      })

      return failure(repositoryError)
    }
  }

  public async findByStockID(
    parameters: FindByStockIDStockTransactionsRepositoryDTO.Parameters
  ): FindByStockIDStockTransactionsRepositoryDTO.Result {
    try {
      const stockTransactions = await this.database.prisma.stockTransaction.findMany({
        where: {
          stockID: parameters.stock.id.value,
          walletID: parameters.wallet.id.value,
          deletedAt: null
        },
        select: {
          id: true,
          disposalAt: true,
          disposalPriceInCents: true,
          wallet: {
            select: {
              id: true
            }
          }
        }
      })

      return success({
        stockTransactions: stockTransactions.map((stockTransaction) => ({
          id: new ID({ id: stockTransaction.id }),
          wallet: { id: new ID({ id: stockTransaction.wallet.id }) },
          disposalPriceInCents: stockTransaction.disposalPriceInCents,
          disposalAt: stockTransaction.disposalAt ? new DateTime(stockTransaction.disposalAt) : null
        }))
      })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.STOCK_TRANSACTIONS,
          method: StockTransactionsRepositoryMethods.FIND_BY_STOCK_ID,
          externalName: RepositoryExternalName.PRISMA
        }
      })
      this.loggerProvider.sendLogError({
        message: repositoryError.errorMessage,
        value: repositoryError
      })

      return failure(repositoryError)
    }
  }

  public async findByWalletID(
    parameters: FindByWalletIDStockTransactionsRepositoryDTO.Parameters
  ): FindByWalletIDStockTransactionsRepositoryDTO.Result {
    try {
      const stockTransactions = await this.database.prisma.stockTransaction.findMany({
        where: {
          walletID: parameters.wallet.id.value,
          disposalAt: parameters.isDisposal ? { not: null } : null,
          deletedAt: null
        },
        select: {
          id: true,
          acquisitionAt: true,
          acquisitionPriceInCents: true,
          disposalAt: true,
          disposalPriceInCents: true,
          investor: { select: { id: true } },
          wallet: { select: { id: true } },
          stock: {
            select: {
              id: true,
              symbol: true,
              currentMarketPriceInCents: true,
              logoURL: true
            }
          }
        }
      })

      // Group transactions by stock
      const stocksMap = new Map<
        string,
        {
          id: ID
          symbol: string
          currentMarketPriceInCents: number
          logoURL: string | null
          transactions: Array<{
            id: ID
            acquisitionAt: DateTime
            acquisitionPriceInCents: number
            disposalAt: DateTime | null
            disposalPriceInCents: number | null
            investor: { id: ID }
            wallet: { id: ID }
          }>
        }
      >()

      for (const transaction of stockTransactions) {
        const stockId = transaction.stock.id
        if (!stocksMap.has(stockId)) {
          stocksMap.set(stockId, {
            id: new ID({ id: stockId }),
            symbol: transaction.stock.symbol,
            currentMarketPriceInCents: transaction.stock.currentMarketPriceInCents,
            logoURL: transaction.stock.logoURL,
            transactions: []
          })
        }

        stocksMap.get(stockId)?.transactions.push({
          id: new ID({ id: transaction.id }),
          acquisitionAt: new DateTime(transaction.acquisitionAt),
          acquisitionPriceInCents: transaction.acquisitionPriceInCents,
          disposalAt: transaction.disposalAt ? new DateTime(transaction.disposalAt) : null,
          disposalPriceInCents: transaction.disposalPriceInCents,
          investor: { id: new ID({ id: transaction.investor.id }) },
          wallet: { id: new ID({ id: transaction.wallet.id }) }
        })
      }

      return success({
        stocks: Array.from(stocksMap.values())
      })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.STOCK_TRANSACTIONS,
          method: StockTransactionsRepositoryMethods.FIND_BY_WALLET_ID,
          externalName: RepositoryExternalName.PRISMA
        }
      })
      this.loggerProvider.sendLogError({
        message: repositoryError.errorMessage,
        value: repositoryError
      })

      return failure(repositoryError)
    }
  }

  public async updateDisposal(
    parameters: UpdateDisposalStockTransactionsRepositoryDTO.Parameters
  ): UpdateDisposalStockTransactionsRepositoryDTO.Result {
    try {
      for (const stockTransaction of parameters.stockTransactions) {
        await this.database.prisma.stockTransaction.update({
          where: { id: stockTransaction.id.value },
          data: {
            disposalAt: stockTransaction.disposalAt?.value,
            disposalPriceInCents: stockTransaction.disposalPriceInCents
          }
        })
      }

      return success(null)
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.STOCK_TRANSACTIONS,
          method: StockTransactionsRepositoryMethods.UPDATE_DISPOSAL,
          externalName: RepositoryExternalName.PRISMA
        }
      })
      this.loggerProvider.sendLogError({
        message: repositoryError.errorMessage,
        value: repositoryError
      })

      return failure(repositoryError)
    }
  }
}
