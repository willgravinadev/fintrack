import type { RestController } from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import {
  ListAllWalletsRestController,
  type ListAllWalletsRestControllerDTO
} from '@/controllers/rest/wallets/list-all-wallets.rest-controller'
import { makeAuthenticateUserUseCase } from '@/factories/use-cases/users/authenticate-user-use-case.factory'
import { makeListAllWalletsUseCase } from '@/factories/use-cases/wallets/list-all-wallets-use-case.factory'

export const makeListAllWalletsRestController = (): RestController<
  ListAllWalletsRestControllerDTO.Parameters,
  ListAllWalletsRestControllerDTO.ResultFailure,
  ListAllWalletsRestControllerDTO.ResultSuccess
> =>
  new ListAllWalletsRestController(
    makeLoggerProvider(),
    makeAuthenticateUserUseCase(),
    makeListAllWalletsUseCase()
  )
