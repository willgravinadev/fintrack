import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = {
  motive: InvalidWalletNameMotive
  walletName: string
}

export enum InvalidWalletNameMotive {
  EMPTY = 'empty',
  TOO_LONG = 'too long'
}

export class InvalidWalletNameError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidWalletNameError'

  readonly errorValue: null

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'InvalidWalletNameError'
    this.errorMessage = `Invalid wallet name: ${parameters.walletName} motive: ${parameters.motive}`
    this.status = StatusError.INVALID
    this.errorValue = null
  }
}
