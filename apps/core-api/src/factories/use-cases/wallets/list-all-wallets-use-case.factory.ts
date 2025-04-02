import type { UseCase } from '@fintrack/domain'

import { makeStockTransactionsRepository, makeWalletsRepository } from '@fintrack/db'
import { makeLoggerProvider } from '@fintrack/logger'

import {
  ListAllWalletsUseCase,
  type ListAllWalletsUseCaseDTO
} from '@/use-cases/wallets/list-all-wallets.use-case'

export const makeListAllWalletsUseCase = (): UseCase<
  ListAllWalletsUseCaseDTO.Parameters,
  ListAllWalletsUseCaseDTO.ResultFailure,
  ListAllWalletsUseCaseDTO.ResultSuccess
> =>
  new ListAllWalletsUseCase(
    makeLoggerProvider(),
    makeWalletsRepository(),
    makeStockTransactionsRepository()
  )
