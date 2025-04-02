import type { Database } from '../database'

import {
  ID,
  type ISearchBySymbolStocksRepository,
  type ISendLogErrorLoggerProvider,
  type IValidateIDStocksRepository,
  RepositoryError,
  RepositoryExternalName,
  RepositoryNames,
  type SearchBySymbolStocksRepositoryDTO,
  type Stock,
  StocksRepositoryMethods,
  type ValidateIDStocksRepositoryDTO
} from '@fintrack/domain'
import { failure, success } from '@fintrack/utils'

export class StocksPrismaRepository
  implements ISearchBySymbolStocksRepository, IValidateIDStocksRepository
{
  constructor(
    private readonly loggerProvider: ISendLogErrorLoggerProvider,
    private readonly database: Database
  ) {}

  public async validateID(
    parameters: ValidateIDStocksRepositoryDTO.Parameters
  ): ValidateIDStocksRepositoryDTO.Result {
    try {
      const found = await this.database.prisma.stock.findUnique({
        where: { id: parameters.stock.id.value }
      })

      if (found === null) {
        return success({ foundStock: null })
      }

      const foundStock: Pick<Stock, 'id'> = {
        id: new ID({ id: found.id })
      }

      return success({ foundStock })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.STOCKS,
          method: StocksRepositoryMethods.VALIDATE_ID,
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

  public async searchBySymbol(
    parameters: SearchBySymbolStocksRepositoryDTO.Parameters
  ): SearchBySymbolStocksRepositoryDTO.Result {
    try {
      const found = await this.database.prisma.stock.findMany({
        where: { symbol: { contains: parameters.symbol, mode: 'insensitive' } },
        skip: parameters.pagination.skip,
        take: parameters.pagination.limit
      })
      const total = await this.database.prisma.stock.count({
        where: { symbol: { contains: parameters.symbol, mode: 'insensitive' } }
      })

      const foundStocks: Array<
        Pick<Stock, 'id' | 'symbol' | 'shortName' | 'longName' | 'logoURL'>
      > = found.map((stock) => ({
        id: new ID({ id: stock.id }),
        symbol: stock.symbol,
        shortName: stock.shortName,
        longName: stock.longName,
        logoURL: stock.logoURL
      }))

      return success({
        foundStocks,
        total
      })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.STOCKS,
          method: StocksRepositoryMethods.SEARCH_BY_SYMBOL,
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
