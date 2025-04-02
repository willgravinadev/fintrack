import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { InvalidIDError } from '../../errors/value-objects/id/invalid-id.error'
import type { Wallet } from '../../models/wallet.model'
import type { Either } from '@fintrack/utils'

export namespace ValidateIDWalletsRepositoryDTO {
  export type Parameters = Readonly<{ wallet: Pick<Wallet, 'id'> }>

  export type ResultFailure = Readonly<RepositoryError | InvalidIDError>
  export type ResultSuccess = Readonly<{ foundWallet: null | Pick<Wallet, 'id' | 'owner'> }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IValidateIDWalletsRepository {
  validateID(
    parameters: ValidateIDWalletsRepositoryDTO.Parameters
  ): ValidateIDWalletsRepositoryDTO.Result
}
