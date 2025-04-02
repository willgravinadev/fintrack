import type { AuthenticateUserUseCaseDTO } from '@/use-cases/users/authenticate-user.use-case'
import type { CreateWalletUseCaseDTO } from '@/use-cases/wallets/create-wallet.use-case'

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

export namespace CreateWalletRestControllerDTO {
  export type Body = Readonly<{ newWallet: { name: string } }>
  export type Headers = Readonly<undefined>
  export type Parameters = Readonly<HttpRequest<Body, Headers>>

  export type ResultFailure = Readonly<
    AuthenticateUserUseCaseDTO.ResultFailure | CreateWalletUseCaseDTO.ResultFailure
  >
  export type ResultSuccess = Readonly<
    HttpResponseSuccess<{ walletCreated: { id: string; name: string } }>
  >

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class CreateWalletRestController extends RestController<
  CreateWalletRestControllerDTO.Parameters,
  CreateWalletRestControllerDTO.ResultFailure,
  CreateWalletRestControllerDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogErrorLoggerProvider & ISendLogTimeControllerLoggerProvider,
    private readonly authenticateUserUseCase: UseCase<
      AuthenticateUserUseCaseDTO.Parameters,
      AuthenticateUserUseCaseDTO.ResultFailure,
      AuthenticateUserUseCaseDTO.ResultSuccess
    >,
    private readonly createWalletUseCase: UseCase<
      CreateWalletUseCaseDTO.Parameters,
      CreateWalletUseCaseDTO.ResultFailure,
      CreateWalletUseCaseDTO.ResultSuccess
    >
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    request: CreateWalletRestControllerDTO.Parameters
  ): CreateWalletRestControllerDTO.Result {
    const { newWallet } = request.body
    const authenticateUserResult = await this.authenticateUserUseCase.execute({
      accessToken: request.access_token
    })
    if (authenticateUserResult.isFailure()) return failure(authenticateUserResult.value)
    const { userAuthenticated } = authenticateUserResult.value

    const createWalletResult = await this.createWalletUseCase.execute({
      user: { id: userAuthenticated.id },
      name: newWallet.name
    })
    if (createWalletResult.isFailure()) return failure(createWalletResult.value)

    return success({
      status: HttpStatusSuccess.CREATED,
      success: {
        walletCreated: {
          id: createWalletResult.value.wallet.id.value,
          name: createWalletResult.value.wallet.name
        }
      }
    })
  }
}
