import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { StockTransaction } from '../../models/stock-transaction.model'
import type { Either } from '@fintrack/utils'

export namespace CreateStockTransactionsRepositoryDTO {
  export type Parameters = Readonly<{
    stockTransaction: StockTransaction
  }>

  export type ResultFailure = Readonly<RepositoryError>
  export type ResultSuccess = Readonly<null>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface ICreateStockTransactionsRepository {
  create(
    parameters: CreateStockTransactionsRepositoryDTO.Parameters
  ): CreateStockTransactionsRepositoryDTO.Result
}
