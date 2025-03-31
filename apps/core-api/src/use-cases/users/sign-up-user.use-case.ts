import {
  Email,
  EmailAlreadyInUseError,
  type GenerateIDError,
  type ICreateUsersRepository,
  type IEncryptPasswordCryptoProvider,
  type InvalidEmailError,
  type InvalidGenerateDateTimeError,
  type InvalidIDError,
  type InvalidPasswordFormatError,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type IValidateEmailUsersRepository,
  Password,
  type ProviderError,
  type RepositoryError,
  UseCase,
  User
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace SignUpUserUseCaseDTO {
  export type Parameters = Readonly<{
    user: {
      email: string
      password: string
      name: string
    }
  }>

  export type ResultFailure = Readonly<
    | InvalidEmailError
    | InvalidIDError
    | InvalidPasswordFormatError
    | EmailAlreadyInUseError
    | ProviderError
    | RepositoryError
    | GenerateIDError
    | InvalidGenerateDateTimeError
  >
  export type ResultSuccess = Readonly<{
    userCreated: Pick<User, 'id' | 'email' | 'name'>
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class SignUpUserUseCase extends UseCase<
  SignUpUserUseCaseDTO.Parameters,
  SignUpUserUseCaseDTO.ResultFailure,
  SignUpUserUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly usersRepository: IValidateEmailUsersRepository & ICreateUsersRepository,
    private readonly cryptoProvider: IEncryptPasswordCryptoProvider
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: SignUpUserUseCaseDTO.Parameters
  ): SignUpUserUseCaseDTO.Result {
    const validateEmail = Email.validateEmailAddress({
      email: parameters.user.email
    })
    if (validateEmail.isFailure()) {
      return failure(validateEmail.value)
    }
    const { emailValidated } = validateEmail.value
    const validatePassword = Password.validateDecryptedPassword({
      password: parameters.user.password
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
    if (foundUser !== null && foundUser.email.value === emailValidated.value) {
      return failure(new EmailAlreadyInUseError({ email: emailValidated }))
    }
    const encryptPasswordResult = await this.cryptoProvider.encryptPassword({
      password: passwordValidated
    })
    if (encryptPasswordResult.isFailure()) {
      return failure(encryptPasswordResult.value)
    }
    const { passwordEncrypted } = encryptPasswordResult.value
    const newUser = User.createNewUser({
      email: emailValidated,
      password: passwordEncrypted,
      name: parameters.user.name
    })
    if (newUser.isFailure()) {
      return failure(newUser.value)
    }
    const { userCreated } = newUser.value
    const createUserResult = await this.usersRepository.create({
      newUser: userCreated
    })
    if (createUserResult.isFailure()) {
      return failure(createUserResult.value)
    }
    return success({ userCreated })
  }
}
