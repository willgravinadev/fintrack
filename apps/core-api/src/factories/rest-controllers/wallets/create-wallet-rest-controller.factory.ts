import type { RestController } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import {
  CreateWalletRestController,
  type CreateWalletRestControllerDTO
} from '@/controllers/rest/wallets/create-wallet.rest-controller'
import { makeAuthenticateUserUseCase } from '@/factories/use-cases/users/authenticate-user-use-case.factory'
import { makeCreateWalletUseCase } from '@/factories/use-cases/wallets/create-wallet-use-case.factory'

export const makeCreateWalletRestController = (): RestController<
  CreateWalletRestControllerDTO.Parameters,
  CreateWalletRestControllerDTO.ResultFailure,
  CreateWalletRestControllerDTO.ResultSuccess
> =>
  new CreateWalletRestController(
    makeLoggerProvider(),
    makeAuthenticateUserUseCase(),
    makeCreateWalletUseCase()
  )
