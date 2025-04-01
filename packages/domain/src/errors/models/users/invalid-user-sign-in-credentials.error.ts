import type { ProviderError } from '../../_shared/provider.error'

import { StatusError } from '../../_shared/status-error'

export class InvalidUserSignInCredentialsError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidUserSignInCredentialsError'

  readonly errorValue: null | ProviderError | Error | unknown

  constructor() {
    this.status = StatusError.INVALID
    this.errorMessage = `Invalid user sign in credentials.`
    this.name = 'InvalidUserSignInCredentialsError'
    this.errorValue = null
  }
}
