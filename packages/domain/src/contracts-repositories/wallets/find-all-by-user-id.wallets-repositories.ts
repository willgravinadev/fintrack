import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { User } from '../../models/user.model'
import type { Wallet } from '../../models/wallet.model'
import type { Either } from '@fintrack/utils'

export namespace FindAllByUserIDWalletsRepositoryDTO {
  export type Parameters = Readonly<{ user: Pick<User, 'id'> }>

  export type ResultFailure = Readonly<RepositoryError>
  export type ResultSuccess = Readonly<{
    wallets: Array<Pick<Wallet, 'id' | 'name' | 'owner'>>
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IFindAllByUserIDWalletsRepository {
  findAllByUserID(
    parameters: FindAllByUserIDWalletsRepositoryDTO.Parameters
  ): FindAllByUserIDWalletsRepositoryDTO.Result
}
