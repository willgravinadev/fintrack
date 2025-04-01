import type { RepositoryError } from '../../errors/_shared/repository.error'
import type { InvalidIDError } from '../../errors/value-objects/id/invalid-id.error'
import type { Stock } from '../../models/stock.model'
import type { Either } from '@fintrack/utils'

export namespace SearchBySymbolStocksRepositoryDTO {
  export type Parameters = Readonly<{
    symbol: string
    pagination: {
      skip: number
      limit: number
    }
  }>

  export type ResultFailure = Readonly<RepositoryError | InvalidIDError>
  export type ResultSuccess = Readonly<{
    foundStocks: Array<Pick<Stock, 'id' | 'symbol' | 'shortName' | 'longName' | 'logoURL'>>
    total: number
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface ISearchBySymbolStocksRepository {
  searchBySymbol(
    parameters: SearchBySymbolStocksRepositoryDTO.Parameters
  ): SearchBySymbolStocksRepositoryDTO.Result
}
