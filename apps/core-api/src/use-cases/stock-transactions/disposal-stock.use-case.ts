import {
  DateTime,
  ID,
  type IFindByStockIDStockTransactionsRepository,
  type InvalidDateTimeError,
  InvalidDisposalPriceError,
  type InvalidGenerateDateTimeError,
  type InvalidIDError,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  type IUpdateDisposalStockTransactionsRepository,
  type IValidateIDStocksRepository,
  type IValidateIDWalletsRepository,
  ModelName,
  NoStockTransactionsFoundError,
  type RepositoryError,
  StockNotFoundError,
  type StockTransaction,
  StockTransactionsQuantityMismatchError,
  UseCase,
  type User,
  WalletNotFoundError
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace DisposalStockUseCaseDTO {
  export type Parameters = Readonly<{
    user: Pick<User, 'id'>
    stockID: string
    walletID: string
    disposalPriceInCents: number
    disposalAt: string
    quantity: number
  }>

  export type ResultFailure = Readonly<
    | RepositoryError
    | InvalidIDError
    | StockNotFoundError
    | WalletNotFoundError
    | InvalidDateTimeError
    | InvalidGenerateDateTimeError
    | StockTransactionsQuantityMismatchError
    | NoStockTransactionsFoundError
    | InvalidDisposalPriceError
  >
  export type ResultSuccess = Readonly<{
    message: string
    transactionsCount: number
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class DisposalStockUseCase extends UseCase<
  DisposalStockUseCaseDTO.Parameters,
  DisposalStockUseCaseDTO.ResultFailure,
  DisposalStockUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly stockTransactionsRepository: IUpdateDisposalStockTransactionsRepository &
      IFindByStockIDStockTransactionsRepository,
    private readonly stocksRepository: IValidateIDStocksRepository,
    private readonly walletsRepository: IValidateIDWalletsRepository
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: DisposalStockUseCaseDTO.Parameters
  ): DisposalStockUseCaseDTO.Result {
    const stockIDResult = await this.validateStockID({ stockID: parameters.stockID })
    if (stockIDResult.isFailure()) return failure(stockIDResult.value)
    const { stockID } = stockIDResult.value

    const walletIDResult = await this.validateWalletID({ walletID: parameters.walletID })
    if (walletIDResult.isFailure()) return failure(walletIDResult.value)
    const { walletID } = walletIDResult.value

    const transactionsResult = await this.findStockTransactions({
      stockID,
      walletID,
      quantity: parameters.quantity
    })
    if (transactionsResult.isFailure()) return failure(transactionsResult.value)
    const { stockTransactions } = transactionsResult.value

    const disposalValidationResult = this.validateDisposalDetails({
      disposalAt: parameters.disposalAt,
      disposalPriceInCents: parameters.disposalPriceInCents
    })
    if (disposalValidationResult.isFailure()) return failure(disposalValidationResult.value)
    const { disposalAt, now } = disposalValidationResult.value

    const updateResult = await this.stockTransactionsRepository.updateDisposal({
      stockTransactions: stockTransactions.map((stockTransaction) => ({
        id: stockTransaction.id,
        disposalAt,
        disposalPriceInCents: parameters.disposalPriceInCents,
        updatedAt: now
      }))
    })

    if (updateResult.isFailure()) return failure(updateResult.value)

    return success({
      message: 'Stock disposed successfully',
      transactionsCount: stockTransactions.length
    })
  }

  private async validateStockID(parameters: {
    stockID: string
  }): Promise<Either<InvalidIDError | RepositoryError | StockNotFoundError, { stockID: ID }>> {
    const resultValidateStockID = ID.validate({
      id: parameters.stockID,
      modelNameOrValueObjectName: ModelName.STOCK
    })
    if (resultValidateStockID.isFailure()) return failure(resultValidateStockID.value)

    const { idValidated: stockID } = resultValidateStockID.value
    const resultValidateStockIDInDB = await this.stocksRepository.validateID({
      stock: { id: stockID }
    })

    if (resultValidateStockIDInDB.isFailure()) return failure(resultValidateStockIDInDB.value)

    const { foundStock } = resultValidateStockIDInDB.value
    if (foundStock === null) return failure(new StockNotFoundError({ stockID }))

    return success({ stockID })
  }

  private async validateWalletID(parameters: {
    walletID: string
  }): Promise<Either<InvalidIDError | RepositoryError | WalletNotFoundError, { walletID: ID }>> {
    const resultValidateWalletID = ID.validate({
      id: parameters.walletID,
      modelNameOrValueObjectName: ModelName.WALLET
    })
    if (resultValidateWalletID.isFailure()) return failure(resultValidateWalletID.value)

    const { idValidated: walletID } = resultValidateWalletID.value
    const resultValidateWalletIDInDB = await this.walletsRepository.validateID({
      wallet: { id: walletID }
    })

    if (resultValidateWalletIDInDB.isFailure()) return failure(resultValidateWalletIDInDB.value)

    const { foundWallet } = resultValidateWalletIDInDB.value
    if (!foundWallet?.id.equals({ otherID: walletID })) {
      return failure(new WalletNotFoundError({ walletID }))
    }

    return success({ walletID })
  }

  private async findStockTransactions(parameters: {
    stockID: ID
    walletID: ID
    quantity: number
  }): Promise<
    Either<
      RepositoryError | NoStockTransactionsFoundError | StockTransactionsQuantityMismatchError,
      Readonly<{
        stockTransactions: Array<
          Pick<StockTransaction, 'id' | 'disposalAt' | 'disposalPriceInCents' | 'wallet'>
        >
      }>
    >
  > {
    const resultFindByStockID = await this.stockTransactionsRepository.findByStockID({
      stock: { id: parameters.stockID },
      wallet: { id: parameters.walletID },
      quantity: parameters.quantity
    })

    if (resultFindByStockID.isFailure()) return failure(resultFindByStockID.value)

    const { stockTransactions } = resultFindByStockID.value
    if (stockTransactions.length === 0) {
      return failure(
        new NoStockTransactionsFoundError({
          stockID: parameters.stockID,
          walletID: parameters.walletID
        })
      )
    }

    if (stockTransactions.length !== parameters.quantity) {
      return failure(
        new StockTransactionsQuantityMismatchError({
          expectedQuantity: parameters.quantity,
          foundQuantity: stockTransactions.length
        })
      )
    }

    return success({ stockTransactions })
  }

  private validateDisposalDetails(parameters: {
    disposalAt: string
    disposalPriceInCents: number
  }): Either<
    InvalidDateTimeError | InvalidGenerateDateTimeError | InvalidDisposalPriceError,
    { disposalAt: DateTime; now: DateTime }
  > {
    const validateDisposalAt = DateTime.validate({
      date: parameters.disposalAt
    })
    if (validateDisposalAt.isFailure()) return failure(validateDisposalAt.value)

    const resultGenerateDateTime = DateTime.now()
    if (resultGenerateDateTime.isFailure()) return failure(resultGenerateDateTime.value)

    if (parameters.disposalPriceInCents <= 0) {
      return failure(
        new InvalidDisposalPriceError({
          disposalPriceInCents: parameters.disposalPriceInCents
        })
      )
    }

    return success({
      disposalAt: validateDisposalAt.value.dateValidated,
      now: resultGenerateDateTime.value.now
    })
  }
}
