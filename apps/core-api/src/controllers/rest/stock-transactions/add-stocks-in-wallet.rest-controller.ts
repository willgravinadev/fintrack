import type { AddStocksInWalletUseCaseDTO } from '@/use-cases/stock-transactions/add-stocks-in-wallet.use-case'
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

export namespace AddStocksInWalletRestControllerDTO {
  export type Body = Readonly<{
    stockID: string
    walletID: string
    quantity: number
    acquisitionPriceInCents: number
    acquisitionAt: string
  }>
  export type Headers = Readonly<undefined>
  export type Parameters = Readonly<HttpRequest<Body, Headers>>

  export type ResultFailure = Readonly<
    AuthenticateUserUseCaseDTO.ResultFailure | AddStocksInWalletUseCaseDTO.ResultFailure
  >
  export type ResultSuccess = Readonly<
    HttpResponseSuccess<{
      message: string
      transactionsCount: number
    }>
  >

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class AddStocksInWalletRestController extends RestController<
  AddStocksInWalletRestControllerDTO.Parameters,
  AddStocksInWalletRestControllerDTO.ResultFailure,
  AddStocksInWalletRestControllerDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogErrorLoggerProvider & ISendLogTimeControllerLoggerProvider,
    private readonly authenticateUserUseCase: UseCase<
      AuthenticateUserUseCaseDTO.Parameters,
      AuthenticateUserUseCaseDTO.ResultFailure,
      AuthenticateUserUseCaseDTO.ResultSuccess
    >,
    private readonly addStocksInWalletUseCase: UseCase<
      AddStocksInWalletUseCaseDTO.Parameters,
      AddStocksInWalletUseCaseDTO.ResultFailure,
      AddStocksInWalletUseCaseDTO.ResultSuccess
    >
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    request: AddStocksInWalletRestControllerDTO.Parameters
  ): AddStocksInWalletRestControllerDTO.Result {
    const authenticateUserResult = await this.authenticateUserUseCase.execute({
      accessToken: request.access_token
    })
    if (authenticateUserResult.isFailure()) {
      return failure(authenticateUserResult.value)
    }
    const { userAuthenticated } = authenticateUserResult.value
    const addStocksInWalletResult = await this.addStocksInWalletUseCase.execute({
      user: userAuthenticated,
      stockID: request.body.stockID,
      walletID: request.body.walletID,
      acquisitionPriceInCents: request.body.acquisitionPriceInCents,
      acquisitionAt: request.body.acquisitionAt,
      quantity: request.body.quantity
    })
    if (addStocksInWalletResult.isFailure()) {
      return failure(addStocksInWalletResult.value)
    }
    return success({
      status: HttpStatusSuccess.DONE,
      success: {
        message: addStocksInWalletResult.value.message,
        transactionsCount: addStocksInWalletResult.value.transactionsCount
      }
    })
  }
}
