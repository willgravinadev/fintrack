import type { SignInUserUseCaseDTO } from '@/use-cases/users/sign-in-user.use-case'

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

export namespace SignInUserRestControllerDTO {
  export type Body = {
    credentials: {
      email: string
      password: string
    }
  }
  export type Headers = Readonly<undefined>
  export type Parameters = Readonly<HttpRequest<Body, Headers>>

  export type ResultFailure = Readonly<SignInUserUseCaseDTO.ResultFailure>
  export type ResultSuccess = Readonly<
    HttpResponseSuccess<{
      access_token: string
    }>
  >

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class SignInUserRestController extends RestController<
  SignInUserRestControllerDTO.Parameters,
  SignInUserRestControllerDTO.ResultFailure,
  SignInUserRestControllerDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogErrorLoggerProvider & ISendLogTimeControllerLoggerProvider,
    private readonly signInUserUseCase: UseCase<
      SignInUserUseCaseDTO.Parameters,
      SignInUserUseCaseDTO.ResultFailure,
      SignInUserUseCaseDTO.ResultSuccess
    >
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    request: SignInUserRestControllerDTO.Parameters
  ): SignInUserRestControllerDTO.Result {
    console.log('request', request)
    const { email, password } = request.body.credentials
    const signInResult = await this.signInUserUseCase.execute({
      credentials: { email, password }
    })
    if (signInResult.isFailure()) {
      return failure(signInResult.value)
    }
    return success({
      status: HttpStatusSuccess.DONE,
      success: { access_token: signInResult.value.accessToken }
    })
  }
}
