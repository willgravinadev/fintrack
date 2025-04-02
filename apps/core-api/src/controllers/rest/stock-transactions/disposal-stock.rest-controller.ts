import type { DisposalStockUseCaseDTO } from '@/use-cases/stock-transactions/disposal-stock.use-case'
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

export namespace DisposalStockRestControllerDTO {
  export type Body = Readonly<{
    stockID: string
    walletID: string
    disposalPriceInCents: number
    disposalAt: string
    quantity: number
  }>
  export type Headers = Readonly<undefined>
  export type Parameters = Readonly<HttpRequest<Body, Headers>>

  export type ResultFailure = Readonly<
    AuthenticateUserUseCaseDTO.ResultFailure | DisposalStockUseCaseDTO.ResultFailure
  >
  export type ResultSuccess = Readonly<
    HttpResponseSuccess<{
      message: string
      transactionsCount: number
    }>
  >

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class DisposalStockRestController extends RestController<
  DisposalStockRestControllerDTO.Parameters,
  DisposalStockRestControllerDTO.ResultFailure,
  DisposalStockRestControllerDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogErrorLoggerProvider & ISendLogTimeControllerLoggerProvider,
    private readonly authenticateUserUseCase: UseCase<
      AuthenticateUserUseCaseDTO.Parameters,
      AuthenticateUserUseCaseDTO.ResultFailure,
      AuthenticateUserUseCaseDTO.ResultSuccess
    >,
    private readonly disposalStockUseCase: UseCase<
      DisposalStockUseCaseDTO.Parameters,
      DisposalStockUseCaseDTO.ResultFailure,
      DisposalStockUseCaseDTO.ResultSuccess
    >
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    request: DisposalStockRestControllerDTO.Parameters
  ): DisposalStockRestControllerDTO.Result {
    const authenticateUserResult = await this.authenticateUserUseCase.execute({
      accessToken: request.access_token
    })
    if (authenticateUserResult.isFailure()) {
      return failure(authenticateUserResult.value)
    }
    const { userAuthenticated } = authenticateUserResult.value
    const disposalStockResult = await this.disposalStockUseCase.execute({
      user: userAuthenticated,
      stockID: request.body.stockID,
      walletID: request.body.walletID,
      disposalPriceInCents: request.body.disposalPriceInCents,
      disposalAt: request.body.disposalAt,
      quantity: request.body.quantity
    })
    if (disposalStockResult.isFailure()) {
      return failure(disposalStockResult.value)
    }
    return success({
      status: HttpStatusSuccess.DONE,
      success: {
        message: disposalStockResult.value.message,
        transactionsCount: disposalStockResult.value.transactionsCount
      }
    })
  }
}
