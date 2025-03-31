import type { RepositoryError } from '@errors/_shared/repository.error'
import type { InvalidEmailError } from '@errors/value-objects/email/invalid-email.error'
import type { InvalidIDError } from '@errors/value-objects/id/invalid-id.error'
import type { Either } from '@fintrack/utils'
import type { Email } from '@value-objects/email.value-object'
import type { ID } from '@value-objects/id.value-object'
import type { Password } from '@value-objects/password.value-object'

export namespace ValidateEmailUsersRepositoryDTO {
  export type Parameters = Readonly<{ email: Email }>

  export type ResultFailure = Readonly<RepositoryError | InvalidEmailError | InvalidIDError>
  export type ResultSuccess = Readonly<{
    foundUser: null | {
      id: ID
      email: Email
      password: null | Pick<Password, 'value' | 'isEncrypted'>
    }
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IValidateEmailUsersRepository {
  validateEmail(
    parameters: ValidateEmailUsersRepositoryDTO.Parameters
  ): ValidateEmailUsersRepositoryDTO.Result
}
