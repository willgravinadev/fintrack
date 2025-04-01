import type { RestController } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import {
  SearchStocksBySymbolRestController,
  type SearchStocksBySymbolRestControllerDTO
} from '@/controllers/rest/stocks/search-stocks-by-symbol.rest-controller'
import { makeSearchStocksBySymbolUseCase } from '@/factories/use-cases/stocks/search-stocks-by-symbol-use-case.factory'
import { makeAuthenticateUserUseCase } from '@/factories/use-cases/users/authenticate-user-use-case.factory'

export const makeSearchStocksBySymbolRestController = (): RestController<
  SearchStocksBySymbolRestControllerDTO.Parameters,
  SearchStocksBySymbolRestControllerDTO.ResultFailure,
  SearchStocksBySymbolRestControllerDTO.ResultSuccess
> =>
  new SearchStocksBySymbolRestController(
    makeLoggerProvider(),
    makeAuthenticateUserUseCase(),
    makeSearchStocksBySymbolUseCase()
  )
