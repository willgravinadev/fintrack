import type { UseCase } from '@fintrack/domain'

import { makeCryptoProvider } from '@fintrack/crypto'
import { makeUsersRepository } from '@fintrack/db'
import { makeLoggerProvider } from '@fintrack/logger'
import {
  SignUpUserUseCase,
  type SignUpUserUseCaseDTO
} from '@use-cases/users/sign-up-user.use-case'

export const makeSignUpUserUseCase = (): UseCase<
  SignUpUserUseCaseDTO.Parameters,
  SignUpUserUseCaseDTO.ResultFailure,
  SignUpUserUseCaseDTO.ResultSuccess
> => {
  return new SignUpUserUseCase(makeLoggerProvider(), makeUsersRepository(), makeCryptoProvider())
}
