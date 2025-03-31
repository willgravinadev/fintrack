import type { ISendLogErrorLoggerProvider, ISendLogInfoLoggerProvider } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'
import { PrismaClient } from '@prisma/client'

export class Database {
  private static instance: Database | undefined

  public prisma: PrismaClient

  private readonly loggerProvider: ISendLogInfoLoggerProvider & ISendLogErrorLoggerProvider

  private constructor() {
    this.prisma = new PrismaClient({
      errorFormat: 'pretty',
      log: ['error', 'warn', 'info', 'query']
    })
    this.loggerProvider = makeLoggerProvider()
  }

  public static getInstance(): Database {
    Database.instance ??= new Database()
    return Database.instance
  }

  public connect(): void {
    this.prisma
      .$connect()
      .then(() => {
        this.loggerProvider.sendLogInfo({
          message: 'Successfully connect prisma'
        })
      })
      .catch((error: unknown) => {
        this.loggerProvider.sendLogError({
          message: 'Failed to establish a connection to the database!',
          value: error
        })
        throw new Error('Failed to establish a connection to the database!')
      })
  }
}
