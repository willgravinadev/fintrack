import type { ICreateUsersRepository, IValidateEmailUsersRepository } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import { Database } from '../database'
import { UsersPrismaRepository } from '../prisma-repositories/users.prisma-repositories'

export const makeUsersRepository = (): IValidateEmailUsersRepository & ICreateUsersRepository => {
  return new UsersPrismaRepository(makeLoggerProvider(), Database.getInstance())
}
