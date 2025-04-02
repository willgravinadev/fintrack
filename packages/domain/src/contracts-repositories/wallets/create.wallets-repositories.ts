import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { Wallet } from '../../models/wallet.model'
import type { Either } from '@fintrack/utils'

export namespace CreateWalletsRepositoryDTO {
  export type Parameters = Readonly<{ newWallet: Wallet }>

  export type ResultFailure = Readonly<RepositoryError>
  export type ResultSuccess = Readonly<null>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface ICreateWalletsRepository {
  create(parameters: CreateWalletsRepositoryDTO.Parameters): CreateWalletsRepositoryDTO.Result
}
