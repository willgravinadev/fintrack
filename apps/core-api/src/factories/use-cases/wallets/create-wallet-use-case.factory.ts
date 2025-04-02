import type { UseCase } from '@fintrack/domain'

import { makeWalletsRepository } from '@fintrack/db'
import { makeLoggerProvider } from '@fintrack/logger'

import {
  CreateWalletUseCase,
  type CreateWalletUseCaseDTO
} from '@/use-cases/wallets/create-wallet.use-case'

export const makeCreateWalletUseCase = (): UseCase<
  CreateWalletUseCaseDTO.Parameters,
  CreateWalletUseCaseDTO.ResultFailure,
  CreateWalletUseCaseDTO.ResultSuccess
> => new CreateWalletUseCase(makeLoggerProvider(), makeWalletsRepository())
