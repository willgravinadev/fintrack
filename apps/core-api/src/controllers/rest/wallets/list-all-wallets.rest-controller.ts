import type { AuthenticateUserUseCaseDTO } from '@/use-cases/users/authenticate-user.use-case'
import type { ListAllWalletsUseCaseDTO } from '@/use-cases/wallets/list-all-wallets.use-case'

import {
  type HttpRequest,
  type HttpResponseSuccess,
  HttpStatusSuccess,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeControllerLoggerProvider,
  RestController,
  type UseCase
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace ListAllWalletsRestControllerDTO {
  export type Body = Readonly<undefined>
  export type Headers = Readonly<undefined>
  export type Parameters = Readonly<HttpRequest<Body, Headers>>

  export type ResultFailure = Readonly<
    AuthenticateUserUseCaseDTO.ResultFailure | ListAllWalletsUseCaseDTO.ResultFailure
  >
  export type ResultSuccess = Readonly<
    HttpResponseSuccess<{
      walletList: Array<{
        wallet: { id: string; name: string }
        stockAggregatedInvestments: Array<{
          id: string
          symbol: string
          shareCount: number
          averagePurchasePriceInCents: number
          currentMarketPriceInCents: number
          totalInvestmentValueInCents: number
        }>
      }>
    }>
  >

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class ListAllWalletsRestController extends RestController<
  ListAllWalletsRestControllerDTO.Parameters,
  ListAllWalletsRestControllerDTO.ResultFailure,
  ListAllWalletsRestControllerDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogErrorLoggerProvider & ISendLogTimeControllerLoggerProvider,
    private readonly authenticateUserUseCase: UseCase<
      AuthenticateUserUseCaseDTO.Parameters,
      AuthenticateUserUseCaseDTO.ResultFailure,
      AuthenticateUserUseCaseDTO.ResultSuccess
    >,
    private readonly listAllWalletsUseCase: UseCase<
      ListAllWalletsUseCaseDTO.Parameters,
      ListAllWalletsUseCaseDTO.ResultFailure,
      ListAllWalletsUseCaseDTO.ResultSuccess
    >
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    request: ListAllWalletsRestControllerDTO.Parameters
  ): ListAllWalletsRestControllerDTO.Result {
    const authenticateUserResult = await this.authenticateUserUseCase.execute({
      accessToken: request.access_token
    })
    if (authenticateUserResult.isFailure()) return failure(authenticateUserResult.value)
    const { userAuthenticated } = authenticateUserResult.value

    const listAllWalletsResult = await this.listAllWalletsUseCase.execute({
      user: { id: userAuthenticated.id }
    })
    if (listAllWalletsResult.isFailure()) return failure(listAllWalletsResult.value)

    return success({
      status: HttpStatusSuccess.DONE,
      success: {
        walletList: listAllWalletsResult.value.walletList.map((wallet) => ({
          wallet: {
            id: wallet.wallet.id.value,
            name: wallet.wallet.name
          },
          stockAggregatedInvestments: wallet.stockAggregatedInvestments.map((stock) => ({
            id: stock.id.value,
            symbol: stock.symbol,
            shareCount: stock.shareCount,
            averagePurchasePriceInCents: stock.averagePurchasePriceInCents,
            currentMarketPriceInCents: stock.currentMarketPriceInCents,
            totalInvestmentValueInCents: stock.totalInvestmentValueInCents
          }))
        }))
      }
    })
  }
}
