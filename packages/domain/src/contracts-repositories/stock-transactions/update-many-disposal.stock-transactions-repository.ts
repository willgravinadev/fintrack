import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { StockTransaction } from '../../models/stock-transaction.model'
import type { Either } from '@fintrack/utils'

export namespace UpdateDisposalStockTransactionsRepositoryDTO {
  export type Parameters = Readonly<{
    stockTransactions: Array<
      Pick<StockTransaction, 'id' | 'updatedAt' | 'disposalAt' | 'disposalPriceInCents'>
    >
  }>

  export type ResultFailure = Readonly<RepositoryError>
  export type ResultSuccess = Readonly<null>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IUpdateDisposalStockTransactionsRepository {
  updateDisposal(
    parameters: UpdateDisposalStockTransactionsRepositoryDTO.Parameters
  ): UpdateDisposalStockTransactionsRepositoryDTO.Result
}
