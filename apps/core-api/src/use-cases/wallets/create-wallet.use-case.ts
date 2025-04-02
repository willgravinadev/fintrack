import {
  type GenerateIDError,
  type ICreateWalletsRepository,
  type InvalidGenerateDateTimeError,
  InvalidWalletNameError,
  InvalidWalletNameMotive,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type RepositoryError,
  UseCase,
  type User,
  Wallet
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace CreateWalletUseCaseDTO {
  export type Parameters = Readonly<{
    user: Pick<User, 'id'>
    name: string
  }>

  export type ResultFailure = Readonly<
    InvalidWalletNameError | GenerateIDError | InvalidGenerateDateTimeError | RepositoryError
  >
  export type ResultSuccess = Readonly<{
    wallet: Pick<Wallet, 'id' | 'name'>
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class CreateWalletUseCase extends UseCase<
  CreateWalletUseCaseDTO.Parameters,
  CreateWalletUseCaseDTO.ResultFailure,
  CreateWalletUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly walletsRepository: ICreateWalletsRepository
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: CreateWalletUseCaseDTO.Parameters
  ): CreateWalletUseCaseDTO.Result {
    const walletNameFormatted = parameters.name.trim()

    if (walletNameFormatted.length === 0) {
      return failure(
        new InvalidWalletNameError({
          motive: InvalidWalletNameMotive.EMPTY,
          walletName: parameters.name
        })
      )
    }

    if (walletNameFormatted.length > 44) {
      return failure(
        new InvalidWalletNameError({
          motive: InvalidWalletNameMotive.TOO_LONG,
          walletName: parameters.name
        })
      )
    }

    const walletResult = Wallet.createNewWallet({
      name: walletNameFormatted,
      owner: parameters.user,
      stockTransactions: []
    })
    if (walletResult.isFailure()) return failure(walletResult.value)
    const { walletCreated } = walletResult.value

    const createWalletResult = await this.walletsRepository.create({
      newWallet: walletCreated
    })
    if (createWalletResult.isFailure()) return failure(createWalletResult.value)

    return success({ wallet: { id: walletCreated.id, name: walletCreated.name } })
  }
}
