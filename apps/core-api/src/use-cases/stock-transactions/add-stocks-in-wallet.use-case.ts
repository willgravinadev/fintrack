import {
  DateTime,
  type GenerateIDError,
  type ICreateStockTransactionsRepository,
  ID,
  type InvalidDateTimeError,
  type InvalidGenerateDateTimeError,
  type InvalidIDError,
  type ISendLogErrorLoggerProvider,
  type ISendLogTimeUseCaseLoggerProvider,
  ModelName,
  type RepositoryError,
  type Stock,
  StockTransaction,
  UseCase,
  type User,
  type Wallet
} from '@fintrack/domain'
import { type Either, failure, success } from '@fintrack/utils'

export namespace AddStocksInWalletUseCaseDTO {
  export type Parameters = Readonly<{
    user: Pick<User, 'id'>
    stockID: string
    walletID: string
    acquisitionPriceInCents: number
    acquisitionAt: string
    quantity: number
  }>

  export type ResultFailure = Readonly<
    | RepositoryError
    | InvalidIDError
    | InvalidDateTimeError
    | GenerateIDError
    | InvalidGenerateDateTimeError
  >
  export type ResultSuccess = Readonly<{
    message: string
    transactionsCount: number
  }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export class AddStocksInWalletUseCase extends UseCase<
  AddStocksInWalletUseCaseDTO.Parameters,
  AddStocksInWalletUseCaseDTO.ResultFailure,
  AddStocksInWalletUseCaseDTO.ResultSuccess
> {
  constructor(
    loggerProvider: ISendLogTimeUseCaseLoggerProvider & ISendLogErrorLoggerProvider,
    private readonly stockTransactionsRepository: ICreateStockTransactionsRepository
  ) {
    super(loggerProvider)
  }

  protected async performOperation(
    parameters: AddStocksInWalletUseCaseDTO.Parameters
  ): AddStocksInWalletUseCaseDTO.Result {
    const validationResult = this.validateInputs(parameters)
    if (validationResult.isFailure()) return failure(validationResult.value)

    const { stockID, walletID, acquisitionAt } = validationResult.value

    return this.createStockTransactions({
      stockID,
      walletID,
      acquisitionAt,
      acquisitionPriceInCents: parameters.acquisitionPriceInCents,
      quantity: parameters.quantity,
      userID: parameters.user.id
    })
  }

  private validateInputs(
    parameters: AddStocksInWalletUseCaseDTO.Parameters
  ): Either<
    AddStocksInWalletUseCaseDTO.ResultFailure,
    { stockID: ID; walletID: ID; acquisitionAt: DateTime }
  > {
    const resultValidateStockID = ID.validate({
      id: parameters.stockID,
      modelNameOrValueObjectName: ModelName.STOCK
    })
    if (resultValidateStockID.isFailure()) return failure(resultValidateStockID.value)
    const { idValidated: stockID } = resultValidateStockID.value

    const resultValidateWalletID = ID.validate({
      id: parameters.walletID,
      modelNameOrValueObjectName: ModelName.WALLET
    })
    if (resultValidateWalletID.isFailure()) return failure(resultValidateWalletID.value)
    const { idValidated: walletID } = resultValidateWalletID.value

    const resultValidateAcquisitionAt = DateTime.validate({
      date: parameters.acquisitionAt
    })
    if (resultValidateAcquisitionAt.isFailure()) {
      return failure(resultValidateAcquisitionAt.value)
    }
    const { dateValidated: acquisitionAt } = resultValidateAcquisitionAt.value

    return success({ stockID, walletID, acquisitionAt })
  }

  private async createStockTransactions(params: {
    stockID: ID
    walletID: ID
    acquisitionAt: DateTime
    acquisitionPriceInCents: number
    quantity: number
    userID: ID
  }): AddStocksInWalletUseCaseDTO.Result {
    const { stockID, walletID, acquisitionAt, acquisitionPriceInCents, quantity, userID } = params
    let stockTransactionsCreated = 0

    const transactionPromises = Array.from({ length: quantity }, async () => {
      const stockTransaction = StockTransaction.createNewStockTransaction({
        stock: { id: stockID } as Pick<Stock, 'id'>,
        wallet: { id: walletID } as Pick<Wallet, 'id'>,
        investor: { id: userID } as Pick<User, 'id'>,
        acquisitionPriceInCents,
        acquisitionAt
      })
      if (stockTransaction.isFailure()) return failure(stockTransaction.value)
      const { stockTransactionCreated } = stockTransaction.value

      const resultCreateStockTransaction = await this.stockTransactionsRepository.create({
        stockTransaction: stockTransactionCreated
      })
      if (resultCreateStockTransaction.isFailure()) {
        return failure(resultCreateStockTransaction.value)
      }
      return success(true)
    })

    const results = await Promise.all(transactionPromises)
    const firstFailure = results.find((result) => result.isFailure())
    if (firstFailure?.isFailure()) {
      return failure(firstFailure.value as AddStocksInWalletUseCaseDTO.ResultFailure)
    }
    stockTransactionsCreated = results.filter((result) => result.isSuccess()).length
    return success({
      message: `${stockTransactionsCreated} stock transaction${stockTransactionsCreated === 1 ? '' : 's'} created successfully`,
      transactionsCount: stockTransactionsCreated
    })
  }
}
