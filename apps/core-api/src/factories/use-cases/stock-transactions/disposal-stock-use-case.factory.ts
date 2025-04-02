import type { UseCase } from '@fintrack/domain'

import {
  makeStocksRepository,
  makeStockTransactionsRepository,
  makeWalletsRepository
} from '@fintrack/db'
import { makeLoggerProvider } from '@fintrack/logger'

import {
  DisposalStockUseCase,
  type DisposalStockUseCaseDTO
} from '@/use-cases/stock-transactions/disposal-stock.use-case'

export const makeDisposalStockUseCase = (): UseCase<
  DisposalStockUseCaseDTO.Parameters,
  DisposalStockUseCaseDTO.ResultFailure,
  DisposalStockUseCaseDTO.ResultSuccess
> =>
  new DisposalStockUseCase(
    makeLoggerProvider(),
    makeStockTransactionsRepository(),
    makeStocksRepository(),
    makeWalletsRepository()
  )
