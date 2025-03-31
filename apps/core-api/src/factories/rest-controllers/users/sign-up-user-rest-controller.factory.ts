import type { RestController } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import {
  SignUpUserRestController,
  type SignUpUserRestControllerDTO
} from '@/controllers/rest/users/sign-up-user.rest-controller'
import { makeSignInUserUseCase } from '@/factories/use-cases/users/sign-in-user-use-case.factory'
import { makeSignUpUserUseCase } from '@/factories/use-cases/users/sign-up-user-use-case.factory'

export const makeSignUpUserRestController = (): RestController<
  SignUpUserRestControllerDTO.Parameters,
  SignUpUserRestControllerDTO.ResultFailure,
  SignUpUserRestControllerDTO.ResultSuccess
> =>
  new SignUpUserRestController(
    makeLoggerProvider(),
    makeSignUpUserUseCase(),
    makeSignInUserUseCase()
  )
