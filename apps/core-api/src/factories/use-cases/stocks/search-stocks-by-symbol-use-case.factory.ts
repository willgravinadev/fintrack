import type { UseCase } from '@fintrack/domain'

import { makeStocksRepository } from '@fintrack/db'
import { makeLoggerProvider } from '@fintrack/logger'

import {
  SearchStocksBySymbolUseCase,
  type SearchStocksBySymbolUseCaseDTO
} from '@/use-cases/stocks/search-stocks-by-symbol.use-case'

export const makeSearchStocksBySymbolUseCase = (): UseCase<
  SearchStocksBySymbolUseCaseDTO.Parameters,
  SearchStocksBySymbolUseCaseDTO.ResultFailure,
  SearchStocksBySymbolUseCaseDTO.ResultSuccess
> => {
  return new SearchStocksBySymbolUseCase(makeLoggerProvider(), makeStocksRepository())
}
