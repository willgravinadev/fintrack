import type { InvalidGenerateDateTimeError } from '../errors/value-objects/date-time/invalid-generate-date-time.error'
import type { GenerateIDError } from '../errors/value-objects/id/generate-id.error'

import { type Either, failure, success } from '@fintrack/utils'

import { ModelName } from '../models/_model-name'
import { DateTime } from '../value-objects/date-time.value-object'
import { ID } from '../value-objects/id.value-object'

export class Stock {
  symbol: string
  shortName: string
  longName: string
  logoURL: string | null

  id: ID
  createdAt: DateTime
  updatedAt: DateTime
  deletedAt: DateTime | null

  private constructor(input: {
    id: ID
    symbol: string
    shortName: string
    longName: string
    logoURL: string | null
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime | null
  }) {
    this.id = input.id
    this.symbol = input.symbol
    this.shortName = input.shortName
    this.longName = input.longName
    this.logoURL = input.logoURL
    this.createdAt = input.createdAt
    this.updatedAt = input.updatedAt
    this.deletedAt = input.deletedAt
  }

  /**
   * Creates a new user instance.
   * @param name - The user's name.
   * @param email - The user's email as a value object.
   * @param password - The user's password as a value object.
   * @returns Either an error (ID or DateTime generation) or a successfully created user.
   */
  public static createNewStock(input: {
    symbol: string
    shortName: string
    longName: string
    logoURL: string | null
  }): Either<GenerateIDError | InvalidGenerateDateTimeError, { stockCreated: Stock }> {
    const idResult = ID.generate({ modelName: ModelName.STOCK })
    if (idResult.isFailure()) return failure(idResult.value)
    const { idGenerated: stockID } = idResult.value

    const dateTimeResult = DateTime.now()
    if (dateTimeResult.isFailure()) {
      return failure(dateTimeResult.value)
    }
    const { now } = dateTimeResult.value

    return success({
      stockCreated: new Stock({
        id: stockID,
        symbol: input.symbol,
        shortName: input.shortName,
        longName: input.longName,
        logoURL: input.logoURL,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
      })
    })
  }
}
