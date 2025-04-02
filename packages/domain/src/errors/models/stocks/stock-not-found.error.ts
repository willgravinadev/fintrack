import type { ID } from '../../../value-objects/id.value-object'

import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = {
  stockID: ID
}

export class StockNotFoundError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'StockNotFoundError'

  readonly errorValue: null

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'StockNotFoundError'
    this.errorMessage = `Stock not found with id: ${parameters.stockID.value}`
    this.status = StatusError.NOT_FOUND
    this.errorValue = null
  }
}
