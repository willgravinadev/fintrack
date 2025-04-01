import type { ProviderError } from '../../_shared/provider.error'

import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = { email: string }

export class InvalidEmailError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidEmailError'

  readonly errorValue: null | ProviderError

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'InvalidEmailError'
    this.errorMessage = `The email ${parameters.email} is invalid`
    this.status = StatusError.INVALID
    this.errorValue = null
  }
}
