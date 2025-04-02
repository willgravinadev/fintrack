import type {
  ICreateWalletsRepository,
  IFindAllByUserIDWalletsRepository,
  IValidateIDWalletsRepository
} from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import { Database } from '../database'
import { WalletsPrismaRepository } from '../prisma-repositories/wallets.prisma-repositories'

export const makeWalletsRepository = (): ICreateWalletsRepository &
  IFindAllByUserIDWalletsRepository &
  IValidateIDWalletsRepository => {
  return new WalletsPrismaRepository(makeLoggerProvider(), Database.getInstance())
}
