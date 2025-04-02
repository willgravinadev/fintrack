import type { RestController } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import {
  DisposalStockRestController,
  type DisposalStockRestControllerDTO
} from '@/controllers/rest/stock-transactions/disposal-stock.rest-controller'
import { makeDisposalStockUseCase } from '@/factories/use-cases/stock-transactions/disposal-stock-use-case.factory'
import { makeAuthenticateUserUseCase } from '@/factories/use-cases/users/authenticate-user-use-case.factory'

export const makeDisposalStockRestController = (): RestController<
  DisposalStockRestControllerDTO.Parameters,
  DisposalStockRestControllerDTO.ResultFailure,
  DisposalStockRestControllerDTO.ResultSuccess
> =>
  new DisposalStockRestController(
    makeLoggerProvider(),
    makeAuthenticateUserUseCase(),
    makeDisposalStockUseCase()
  )
