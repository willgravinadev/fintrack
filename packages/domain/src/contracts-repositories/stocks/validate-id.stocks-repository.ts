import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { InvalidIDError } from '../../errors/value-objects/id/invalid-id.error'
import type { Stock } from '../../models/stock.model'
import type { Either } from '@fintrack/utils'

export namespace ValidateIDStocksRepositoryDTO {
  export type Parameters = Readonly<{ stock: Pick<Stock, 'id'> }>

  export type ResultFailure = Readonly<RepositoryError | InvalidIDError>
  export type ResultSuccess = Readonly<{ foundStock: null | Pick<Stock, 'id'> }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IValidateIDStocksRepository {
  validateID(
    parameters: ValidateIDStocksRepositoryDTO.Parameters
  ): ValidateIDStocksRepositoryDTO.Result
}
