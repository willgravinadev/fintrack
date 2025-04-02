import type { SignInUserUseCaseDTO } from '@/use-cases/users/sign-in-user.use-case'
import type { SignUpUserUseCaseDTO } from '@/use-cases/users/sign-up-user.use-case'
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

export namespace SignUpUserRestControllerDTO {
  export type Body = {
    newUser: {
      email: string
      password: string
      name: string
    }
  }
  export type Headers = Readonly<undefined>
  export type Parameters = Readonly<HttpRequest<Body, Headers>>

  export type ResultFailure = Readonly<
    | SignUpUserUseCaseDTO.ResultFailure
    | SignInUserUseCaseDTO.ResultFailure
    | CreateWalletUseCaseDTO.ResultFailure
  >
  export type ResultSuccess = Readonly<
    HttpResponseSuccess<{
      access_token: string
    }>
  >

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class SignUpUserRestController extends RestController<
  SignUpUserRestControllerDTO.Parameters,
  SignUpUserRestControllerDTO.ResultFailure,
  SignUpUserRestControllerDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogErrorLoggerProvider & ISendLogTimeControllerLoggerProvider,
    private readonly signUpUserUseCase: UseCase<
      SignUpUserUseCaseDTO.Parameters,
      SignUpUserUseCaseDTO.ResultFailure,
      SignUpUserUseCaseDTO.ResultSuccess
    >,
    private readonly createWalletUseCase: UseCase<
      CreateWalletUseCaseDTO.Parameters,
      CreateWalletUseCaseDTO.ResultFailure,
      CreateWalletUseCaseDTO.ResultSuccess
    >,
    private readonly signInUserUseCase: UseCase<
      SignInUserUseCaseDTO.Parameters,
      SignInUserUseCaseDTO.ResultFailure,
      SignInUserUseCaseDTO.ResultSuccess
    >
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    request: SignUpUserRestControllerDTO.Parameters
  ): SignUpUserRestControllerDTO.Result {
    const { newUser } = request.body
    const signUpResult = await this.signUpUserUseCase.execute({
      user: newUser
    })
    if (signUpResult.isFailure()) return failure(signUpResult.value)
    const { userCreated } = signUpResult.value

    const createWalletResult = await this.createWalletUseCase.execute({
      user: { id: userCreated.id },
      name: 'Wallet'
    })
    if (createWalletResult.isFailure()) return failure(createWalletResult.value)

    const signInResult = await this.signInUserUseCase.execute({
      user: { id: userCreated.id }
    })
    if (signInResult.isFailure()) return failure(signInResult.value)

    return success({
      status: HttpStatusSuccess.CREATED,
      success: { access_token: signInResult.value.accessToken }
    })
  }
}
