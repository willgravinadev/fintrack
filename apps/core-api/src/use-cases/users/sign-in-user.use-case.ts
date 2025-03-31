import {
  Email,
  type ICompareEncryptedPasswordCryptoProvider,
  type ID,
  type IGenerateJWTTokenProvider,
  type InvalidEmailError,
  type InvalidIDError,
  type InvalidPasswordFormatError,
  InvalidUserSignInCredentialsError,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type IValidateEmailUsersRepository,
  Password,
  type ProviderError,
  type RepositoryError,
  UseCase,
  type User
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace SignInUserUseCaseDTO {
  export type Parameters = Readonly<
    { credentials: { email: string; password: string } } | { user: Pick<User, 'id'> }
  >

  export type ResultFailure = Readonly<
    | InvalidEmailError
    | InvalidIDError
    | InvalidPasswordFormatError
    | InvalidUserSignInCredentialsError
    | ProviderError
    | RepositoryError
  >
  export type ResultSuccess = Readonly<{ accessToken: string }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class SignInUserUseCase extends UseCase<
  SignInUserUseCaseDTO.Parameters,
  SignInUserUseCaseDTO.ResultFailure,
  SignInUserUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly usersRepository: IValidateEmailUsersRepository,
    private readonly cryptoProvider: ICompareEncryptedPasswordCryptoProvider,
    private readonly tokenProvider: IGenerateJWTTokenProvider
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: SignInUserUseCaseDTO.Parameters
  ): SignInUserUseCaseDTO.Result {
    let userID: ID | null = null

    if ('credentials' in parameters) {
      const validateEmail = Email.validateEmailAddress({
        email: parameters.credentials.email
      })
      if (validateEmail.isFailure()) {
        return failure(validateEmail.value)
      }
      const { emailValidated } = validateEmail.value

      const validatePassword = Password.validateDecryptedPassword({
        password: parameters.credentials.password
      })
      if (validatePassword.isFailure()) {
        return failure(validatePassword.value)
      }
      const { passwordValidated } = validatePassword.value

      const resultValidateEmail = await this.usersRepository.validateEmail({
        email: emailValidated
      })
      if (resultValidateEmail.isFailure()) {
        return failure(resultValidateEmail.value)
      }
      const { foundUser } = resultValidateEmail.value
      if (foundUser === null || foundUser.email.value !== emailValidated.value) {
        return failure(new InvalidUserSignInCredentialsError())
      }

      if (foundUser.password === null) {
        return failure(new InvalidUserSignInCredentialsError())
      }

      const comparePasswordResult = await this.cryptoProvider.compareEncryptedPassword({
        passwordDecrypted: passwordValidated,
        passwordEncrypted: foundUser.password
      })
      if (comparePasswordResult.isFailure()) {
        return failure(comparePasswordResult.value)
      }
      if (!comparePasswordResult.value.isPasswordMatch) {
        return failure(new InvalidUserSignInCredentialsError())
      }
      userID = foundUser.id
    }

    if ('user' in parameters) {
      userID = parameters.user.id
    }

    if (userID === null) {
      return failure(new InvalidUserSignInCredentialsError())
    }

    const generateAccessTokenResult = this.tokenProvider.generateJWT({
      userID: userID.value
    })
    if (generateAccessTokenResult.isFailure()) {
      return failure(generateAccessTokenResult.value)
    }
    const { jwtToken: accessToken } = generateAccessTokenResult.value

    return success({ accessToken })
  }
}
