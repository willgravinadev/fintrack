import type { InvalidGenerateDateTimeError } from '../errors/value-objects/date-time/invalid-generate-date-time.error'
import type { GenerateIDError } from '../errors/value-objects/id/generate-id.error'
import type { Stock } from './stock.model'
import type { User } from './user.model'
import type { Wallet } from './wallet.model'
import type { Either } from '@fintrack/utils'

import { failure, success } from '@fintrack/utils'

import { DateTime } from '../value-objects/date-time.value-object'
import { ID } from '../value-objects/id.value-object'

import { ModelName } from './_model-name'

export class StockTransaction {
  acquisitionAt: DateTime
  acquisitionPriceInCents: number
  createdAt: DateTime
  deletedAt: DateTime | null
  disposalAt: DateTime | null
  disposalPriceInCents: number | null
  id: ID
  investor: Pick<User, 'id'>
  stock: Pick<Stock, 'id'>
  updatedAt: DateTime
  wallet: Pick<Wallet, 'id'>

  private constructor(input: {
    acquisitionAt: DateTime
    acquisitionPriceInCents: number
    createdAt: DateTime
    deletedAt: DateTime | null
    disposalAt: DateTime | null
    disposalPriceInCents: number | null
    id: ID
    investor: Pick<User, 'id'>
    stock: Pick<Stock, 'id'>
    updatedAt: DateTime
    wallet: Pick<Wallet, 'id'>
  }) {
    this.acquisitionAt = input.acquisitionAt
    this.acquisitionPriceInCents = input.acquisitionPriceInCents
    this.createdAt = input.createdAt
    this.deletedAt = input.deletedAt
    this.disposalAt = input.disposalAt
    this.disposalPriceInCents = input.disposalPriceInCents
    this.id = input.id
    this.investor = input.investor
    this.stock = input.stock
    this.updatedAt = input.updatedAt
    this.wallet = input.wallet
  }

  public static createNewStockTransaction(input: {
    stock: Pick<Stock, 'id'>
    wallet: Pick<Wallet, 'id'>
    investor: Pick<User, 'id'>
    acquisitionPriceInCents: number
    acquisitionAt: DateTime
  }): Either<
    GenerateIDError | InvalidGenerateDateTimeError,
    { stockTransactionCreated: StockTransaction }
  > {
    const idResult = ID.generate({ modelName: ModelName.STOCK_TRANSACTION })
    if (idResult.isFailure()) return failure(idResult.value)
    const { idGenerated: stockTransactionID } = idResult.value

    const dateTimeResult = DateTime.now()
    if (dateTimeResult.isFailure()) {
      return failure(dateTimeResult.value)
    }
    const { now } = dateTimeResult.value

    return success({
      stockTransactionCreated: new StockTransaction({
        acquisitionAt: input.acquisitionAt,
        acquisitionPriceInCents: input.acquisitionPriceInCents,
        disposalAt: null,
        disposalPriceInCents: null,
        id: stockTransactionID,
        investor: input.investor,
        stock: input.stock,
        wallet: input.wallet,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
      })
    })
  }
}
