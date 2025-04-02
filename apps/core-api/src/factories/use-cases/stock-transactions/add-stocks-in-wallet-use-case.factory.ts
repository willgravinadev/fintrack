import type { UseCase } from '@fintrack/domain'

import { makeStockTransactionsRepository } from '@fintrack/db'
import { makeLoggerProvider } from '@fintrack/logger'

import {
  AddStocksInWalletUseCase,
  type AddStocksInWalletUseCaseDTO
} from '@/use-cases/stock-transactions/add-stocks-in-wallet.use-case'

export const makeAddStocksInWalletUseCase = (): UseCase<
  AddStocksInWalletUseCaseDTO.Parameters,
  AddStocksInWalletUseCaseDTO.ResultFailure,
  AddStocksInWalletUseCaseDTO.ResultSuccess
> => new AddStocksInWalletUseCase(makeLoggerProvider(), makeStockTransactionsRepository())
