import type { SearchStocksBySymbolUseCaseDTO } from '@/use-cases/stocks/search-stocks-by-symbol.use-case'
import type { AuthenticateUserUseCaseDTO } from '@/use-cases/users/authenticate-user.use-case'

import {
  type HttpRequest,
  type HttpResponseSuccess,
  HttpStatusSuccess,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeControllerLoggerProvider,
  RestController,
  type UseCase
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace SearchStocksBySymbolRestControllerDTO {
  export type Body = Readonly<undefined>
  export type Query = Readonly<{
    symbol: string | undefined | null
    page: string | undefined | null
    limit: string | undefined | null
  }>
  export type Params = Readonly<undefined>
  export type Parameters = Readonly<HttpRequest<Body, Query, Params>>

  export type ResultFailure = Readonly<
    AuthenticateUserUseCaseDTO.ResultFailure | SearchStocksBySymbolUseCaseDTO.ResultFailure
  >
  export type ResultSuccess = Readonly<
    HttpResponseSuccess<{
      foundStocks: Array<{
        id: string
        symbol: string
        shortName: string
        longName: string
        logoURL: string | null
      }>
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
  >

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class SearchStocksBySymbolRestController extends RestController<
  SearchStocksBySymbolRestControllerDTO.Parameters,
  SearchStocksBySymbolRestControllerDTO.ResultFailure,
  SearchStocksBySymbolRestControllerDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogErrorLoggerProvider & ISendLogTimeControllerLoggerProvider,
    private readonly authenticateUserUseCase: UseCase<
      AuthenticateUserUseCaseDTO.Parameters,
      AuthenticateUserUseCaseDTO.ResultFailure,
      AuthenticateUserUseCaseDTO.ResultSuccess
    >,
    private readonly searchStocksBySymbolUseCase: UseCase<
      SearchStocksBySymbolUseCaseDTO.Parameters,
      SearchStocksBySymbolUseCaseDTO.ResultFailure,
      SearchStocksBySymbolUseCaseDTO.ResultSuccess
    >
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    request: SearchStocksBySymbolRestControllerDTO.Parameters
  ): SearchStocksBySymbolRestControllerDTO.Result {
    const authenticateUserResult = await this.authenticateUserUseCase.execute({
      accessToken: request.access_token
    })
    if (authenticateUserResult.isFailure()) {
      return failure(authenticateUserResult.value)
    }
    const { user } = authenticateUserResult.value
    const { symbol, page, limit } = request.query
    const searchStocksBySymbolResult = await this.searchStocksBySymbolUseCase.execute({
      user,
      stockSymbol: symbol ?? '',
      pagination: { page: Number.parseInt(page ?? '1'), limit: Number.parseInt(limit ?? '10') }
    })
    if (searchStocksBySymbolResult.isFailure()) {
      return failure(searchStocksBySymbolResult.value)
    }
    const { foundStocks, pagination } = searchStocksBySymbolResult.value
    return success({
      status: HttpStatusSuccess.DONE,
      success: {
        foundStocks,
        pagination
      }
    })
  }
}
