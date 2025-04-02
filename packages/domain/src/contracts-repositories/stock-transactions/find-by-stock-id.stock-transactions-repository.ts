import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { Stock } from '../../models/stock.model'
import type { StockTransaction } from '../../models/stock-transaction.model'
import type { Wallet } from '../../models/wallet.model'
import type { Either } from '@fintrack/utils'

export namespace FindByStockIDStockTransactionsRepositoryDTO {
  export type Parameters = Readonly<{
    wallet: Pick<Wallet, 'id'>
    stock: Pick<Stock, 'id'>
    quantity: number
  }>

  export type ResultFailure = Readonly<RepositoryError>
  export type ResultSuccess = Readonly<{
    stockTransactions: Array<
      Pick<StockTransaction, 'id' | 'disposalAt' | 'disposalPriceInCents' | 'wallet'>
    >
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IFindByStockIDStockTransactionsRepository {
  findByStockID(
    parameters: FindByStockIDStockTransactionsRepositoryDTO.Parameters
  ): FindByStockIDStockTransactionsRepositoryDTO.Result
}
