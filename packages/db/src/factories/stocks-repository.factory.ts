import type { ISearchBySymbolStocksRepository, IValidateIDStocksRepository } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import { Database } from '../database'
import { StocksPrismaRepository } from '../prisma-repositories/stocks.prisma-repositories'

export const makeStocksRepository = (): ISearchBySymbolStocksRepository &
  IValidateIDStocksRepository => {
  return new StocksPrismaRepository(makeLoggerProvider(), Database.getInstance())
}
