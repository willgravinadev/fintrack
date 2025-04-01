import {
  type InvalidIDError,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type IValidateUserIDUsersRepository,
  type IVerifyJWTTokenProvider,
  type RepositoryError,
  UseCase,
  type User,
  UserUnauthorizedError,
  UserUnauthorizedMotive
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace AuthenticateUserUseCaseDTO {
  export type Parameters = Readonly<{ accessToken: string }>

  export type ResultFailure = Readonly<UserUnauthorizedError | InvalidIDError | RepositoryError>
  export type ResultSuccess = Readonly<{ user: Pick<User, 'id'> }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class AuthenticateUserUseCase extends UseCase<
  AuthenticateUserUseCaseDTO.Parameters,
  AuthenticateUserUseCaseDTO.ResultFailure,
  AuthenticateUserUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly tokenProvider: IVerifyJWTTokenProvider,
    private readonly usersRepository: IValidateUserIDUsersRepository
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: AuthenticateUserUseCaseDTO.Parameters
  ): AuthenticateUserUseCaseDTO.Result {
    const resultVerifyJWT = this.tokenProvider.verifyJWT({ jwtToken: parameters.accessToken })
    if (resultVerifyJWT.isFailure()) {
      return failure(
        new UserUnauthorizedError({
          motive: UserUnauthorizedMotive.INVALID_TOKEN,
          error: resultVerifyJWT.value,
          message: null
        })
      )
    }

    const resultFindUser = await this.usersRepository.validateUserID({
      id: resultVerifyJWT.value.userID
    })
    if (resultFindUser.isFailure()) return failure(resultFindUser.value)
    const { foundUser } = resultFindUser.value

    if (foundUser === null) {
      return failure(
        new UserUnauthorizedError({
          motive: UserUnauthorizedMotive.USER_NOT_FOUND,
          error: null,
          message: null
        })
      )
    }

    return success({ user: { id: foundUser.id } })
  }
}
