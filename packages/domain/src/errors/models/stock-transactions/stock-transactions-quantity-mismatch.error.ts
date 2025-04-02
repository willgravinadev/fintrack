import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = {
  expectedQuantity: number
  foundQuantity: number
}

export class StockTransactionsQuantityMismatchError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'StockTransactionsQuantityMismatchError'

  readonly errorValue: null

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'StockTransactionsQuantityMismatchError'
    this.errorMessage = `Stock transactions quantity mismatch. Expected ${parameters.expectedQuantity} but found ${parameters.foundQuantity}`
    this.status = StatusError.INVALID
    this.errorValue = null
  }
}
