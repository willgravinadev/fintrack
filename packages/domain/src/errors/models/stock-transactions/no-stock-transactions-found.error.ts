import type { ID } from '../../../value-objects/id.value-object'

import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = {
  stockID: ID
  walletID: ID
}

export class NoStockTransactionsFoundError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'NoStockTransactionsFoundError'

  readonly errorValue: null

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'NoStockTransactionsFoundError'
    this.errorMessage = `No stock transactions found with stock id: ${parameters.stockID.value} and wallet id: ${parameters.walletID.value}`
    this.status = StatusError.NOT_FOUND
    this.errorValue = null
  }
}
