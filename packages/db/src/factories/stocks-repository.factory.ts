import type { ISearchBySymbolStocksRepository } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import { Database } from '../database'
import { StocksPrismaRepository } from '../prisma-repositories/stocks.prisma-repositories'

export const makeStocksRepository = (): ISearchBySymbolStocksRepository => {
  return new StocksPrismaRepository(makeLoggerProvider(), Database.getInstance())
}
