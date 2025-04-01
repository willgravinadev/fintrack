import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { InvalidIDError } from '../../errors/value-objects/id/invalid-id.error'
import type { ID } from '../../value-objects/id.value-object'
import type { Either } from '@fintrack/utils'

export namespace ValidateUserIDUsersRepositoryDTO {
  export type Parameters = Readonly<{ id: ID }>

  export type ResultFailure = Readonly<RepositoryError | InvalidIDError>
  export type ResultSuccess = Readonly<{
    foundUser: null | { id: ID }
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IValidateUserIDUsersRepository {
  validateUserID(
    parameters: ValidateUserIDUsersRepositoryDTO.Parameters
  ): ValidateUserIDUsersRepositoryDTO.Result
}
