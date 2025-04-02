import type { InvalidGenerateDateTimeError } from '../errors/value-objects/date-time/invalid-generate-date-time.error'
import type { GenerateIDError } from '../errors/value-objects/id/generate-id.error'
import type { StockTransaction } from './stock-transaction.model'
import type { User } from './user.model'

import { type Either, failure, success } from '@fintrack/utils'

import { DateTime } from '../value-objects/date-time.value-object'
import { ID } from '../value-objects/id.value-object'

import { ModelName } from './_model-name'

export class Wallet {
  name: string
  owner: Pick<User, 'id'>
  stockTransactions: StockTransaction[]

  id: ID
  createdAt: DateTime
  updatedAt: DateTime
  deletedAt: DateTime | null

  private constructor(input: {
    id: ID
    name: string
    owner: Pick<User, 'id'>
    stockTransactions: StockTransaction[]
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime | null
  }) {
    this.id = input.id
    this.name = input.name
    this.owner = input.owner
    this.stockTransactions = input.stockTransactions
    this.createdAt = input.createdAt
    this.updatedAt = input.updatedAt
    this.deletedAt = input.deletedAt
  }

  public static createNewWallet(input: {
    name: string
    owner: Pick<User, 'id'>
    stockTransactions: StockTransaction[]
  }): Either<GenerateIDError | InvalidGenerateDateTimeError, { walletCreated: Wallet }> {
    const idResult = ID.generate({ modelName: ModelName.USER })
    if (idResult.isFailure()) return failure(idResult.value)
    const { idGenerated: walletID } = idResult.value

    const dateTimeResult = DateTime.now()
    if (dateTimeResult.isFailure()) {
      return failure(dateTimeResult.value)
    }
    const { now } = dateTimeResult.value

    return success({
      walletCreated: new Wallet({
        id: walletID,
        name: input.name,
        owner: input.owner,
        stockTransactions: input.stockTransactions,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
      })
    })
  }
}
