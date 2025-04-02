import type { RestController } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import {
  AddStocksInWalletRestController,
  type AddStocksInWalletRestControllerDTO
} from '@/controllers/rest/stock-transactions/add-stocks-in-wallet.rest-controller'
import { makeAddStocksInWalletUseCase } from '@/factories/use-cases/stock-transactions/add-stocks-in-wallet-use-case.factory'
import { makeAuthenticateUserUseCase } from '@/factories/use-cases/users/authenticate-user-use-case.factory'

export const makeAddStocksInWalletRestController = (): RestController<
  AddStocksInWalletRestControllerDTO.Parameters,
  AddStocksInWalletRestControllerDTO.ResultFailure,
  AddStocksInWalletRestControllerDTO.ResultSuccess
> =>
  new AddStocksInWalletRestController(
    makeLoggerProvider(),
    makeAuthenticateUserUseCase(),
    makeAddStocksInWalletUseCase()
  )
