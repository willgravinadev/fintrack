import type { RestController } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import {
  SignInUserRestController,
  type SignInUserRestControllerDTO
} from '@/controllers/rest/users/sign-in-user.rest-controller'
import { makeSignInUserUseCase } from '@/factories/use-cases/users/sign-in-user-use-case.factory'

export const makeSignInUserRestController = (): RestController<
  SignInUserRestControllerDTO.Parameters,
  SignInUserRestControllerDTO.ResultFailure,
  SignInUserRestControllerDTO.ResultSuccess
> => new SignInUserRestController(makeLoggerProvider(), makeSignInUserUseCase())
