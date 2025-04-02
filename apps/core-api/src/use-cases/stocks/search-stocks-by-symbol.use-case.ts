import {
  type InvalidIDError,
  InvalidPaginationError,
  InvalidPaginationErrorMotive,
  type ISearchBySymbolStocksRepository,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type RepositoryError,
  type Stock,
  UseCase,
  type User
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace SearchStocksBySymbolUseCaseDTO {
  export type Parameters = Readonly<{
    user: Pick<User, 'id'>
    stockSymbol: string
    pagination: { page: number; limit: number }
  }>

  export type ResultFailure = Readonly<InvalidIDError | RepositoryError | InvalidPaginationError>
  export type ResultSuccess = Readonly<{
    foundStocks: Array<Pick<Stock, 'id' | 'symbol' | 'shortName' | 'longName' | 'logoURL'>>
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
      hasNextPage: boolean
      hasPrevPage: boolean
      nextPage: number | null
      prevPage: number | null
    }
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class SearchStocksBySymbolUseCase extends UseCase<
  SearchStocksBySymbolUseCaseDTO.Parameters,
  SearchStocksBySymbolUseCaseDTO.ResultFailure,
  SearchStocksBySymbolUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly stocksRepository: ISearchBySymbolStocksRepository
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: SearchStocksBySymbolUseCaseDTO.Parameters
  ): SearchStocksBySymbolUseCaseDTO.Result {
    if (parameters.pagination.page < 1) {
      return failure(
        new InvalidPaginationError({ motive: InvalidPaginationErrorMotive.PAGE_LESS_THAN_1 })
      )
    }

    if (parameters.pagination.limit < 1) {
      return failure(
        new InvalidPaginationError({ motive: InvalidPaginationErrorMotive.LIMIT_LESS_THAN_1 })
      )
    }

    if (parameters.pagination.limit > 30) {
      return failure(
        new InvalidPaginationError({ motive: InvalidPaginationErrorMotive.LIMIT_GREATER_THAN_30 })
      )
    }

    const result = await this.stocksRepository.searchBySymbol({
      symbol: parameters.stockSymbol,
      pagination: {
        skip: (parameters.pagination.page - 1) * parameters.pagination.limit,
        limit: parameters.pagination.limit
      }
    })

    if (result.isFailure()) {
      return failure(result.value)
    }

    const { total, foundStocks } = result.value

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / parameters.pagination.limit)
    const hasNextPage = parameters.pagination.page < totalPages
    const hasPrevPage = parameters.pagination.page > 1

    return success({
      pagination: {
        total,
        page: parameters.pagination.page,
        limit: parameters.pagination.limit,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? parameters.pagination.page + 1 : null,
        prevPage: hasPrevPage ? parameters.pagination.page - 1 : null
      },
      foundStocks: foundStocks.map((stock) => ({
        id: stock.id,
        symbol: stock.symbol,
        shortName: stock.shortName,
        longName: stock.longName,
        logoURL: stock.logoURL
      }))
    })
  }
}
