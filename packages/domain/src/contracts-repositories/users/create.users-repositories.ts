import type { RepositoryError } from '@errors/_shared/repository.error'
import type { Either } from '@fintrack/utils'
import type { User } from '@models/user.model'

export namespace CreateUsersRepositoryDTO {
  export type Parameters = Readonly<{
    newUser: Pick<
      User,
      'createdAt' | 'deletedAt' | 'email' | 'id' | 'name' | 'password' | 'updatedAt'
    >
  }>

  export type ResultFailure = Readonly<RepositoryError>
  export type ResultSuccess = Readonly<null>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface ICreateUsersRepository {
  create(parameters: CreateUsersRepositoryDTO.Parameters): CreateUsersRepositoryDTO.Result
}
