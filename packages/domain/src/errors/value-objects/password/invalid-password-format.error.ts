import type { ProviderError } from '../../_shared/provider.error'

import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = { decryptedPassword: string }

export class InvalidPasswordFormatError {
  public readonly status: StatusError

  public readonly errorMessage: string

  public readonly name: 'InvalidPasswordFormatError'

  public readonly errorValue: null | ProviderError

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'InvalidPasswordFormatError'
    this.errorMessage = `The password ${parameters.decryptedPassword} is invalid`
    this.status = StatusError.INVALID
    this.errorValue = null
  }
}
