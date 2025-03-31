import type { UseCase } from '@fintrack/domain'

import { makeCryptoProvider } from '@fintrack/crypto'
import { makeUsersRepository } from '@fintrack/db'
import { makeLoggerProvider } from '@fintrack/logger'
import { makeTokenProvider } from '@fintrack/token'
import {
  SignInUserUseCase,
  type SignInUserUseCaseDTO
} from '@use-cases/users/sign-in-user.use-case'

export const makeSignInUserUseCase = (): UseCase<
  SignInUserUseCaseDTO.Parameters,
  SignInUserUseCaseDTO.ResultFailure,
  SignInUserUseCaseDTO.ResultSuccess
> => {
  return new SignInUserUseCase(
    makeLoggerProvider(),
    makeUsersRepository(),
    makeCryptoProvider(),
    makeTokenProvider()
  )
}
