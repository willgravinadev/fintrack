import type { ID } from '../../../value-objects/id.value-object'

import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = {
  walletID: ID
}

export class WalletNotFoundError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'WalletNotFoundError'

  readonly errorValue: null

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'WalletNotFoundError'
    this.errorMessage = `Wallet not found with id: ${parameters.walletID.value}`
    this.status = StatusError.NOT_FOUND
    this.errorValue = null
  }
}
