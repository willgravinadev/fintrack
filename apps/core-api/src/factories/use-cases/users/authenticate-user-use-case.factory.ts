import type { UseCase } from '@fintrack/domain'

import { makeUsersRepository } from '@fintrack/db'
import { makeLoggerProvider } from '@fintrack/logger'
import { makeTokenProvider } from '@fintrack/token'

import {
  AuthenticateUserUseCase,
  type AuthenticateUserUseCaseDTO
} from '@/use-cases/users/authenticate-user.use-case'

export const makeAuthenticateUserUseCase = (): UseCase<
  AuthenticateUserUseCaseDTO.Parameters,
  AuthenticateUserUseCaseDTO.ResultFailure,
  AuthenticateUserUseCaseDTO.ResultSuccess
> => {
  return new AuthenticateUserUseCase(
    makeLoggerProvider(),
    makeTokenProvider(),
    makeUsersRepository()
  )
}
