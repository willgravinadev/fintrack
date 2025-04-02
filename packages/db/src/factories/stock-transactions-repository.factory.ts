import type {
  ICreateStockTransactionsRepository,
  IFindByStockIDStockTransactionsRepository,
  IFindByWalletIDStockTransactionsRepository,
  IUpdateDisposalStockTransactionsRepository
} from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import { Database } from '../database'
import { StockTransactionsPrismaRepository } from '../prisma-repositories/stock-transactions.prisma-repositories'

export const makeStockTransactionsRepository = (): ICreateStockTransactionsRepository &
  IFindByStockIDStockTransactionsRepository &
  IFindByWalletIDStockTransactionsRepository &
  IUpdateDisposalStockTransactionsRepository => {
  return new StockTransactionsPrismaRepository(makeLoggerProvider(), Database.getInstance())
}
