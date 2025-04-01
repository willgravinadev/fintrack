import type { Email } from '../../../value-objects/email.value-object'
import type { ProviderError } from '../../_shared/provider.error'

import { StatusError } from '../../_shared/status-error'

export class EmailNotFoundError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'EmailNotFoundError'

  readonly errorValue: null | ProviderError

  constructor(parameters: { email: Pick<Email, 'value'> }) {
    this.name = 'EmailNotFoundError'
    this.errorMessage = `The email ${parameters.email.value} was not found.`
    this.status = StatusError.NOT_FOUND
    this.errorValue = null
  }
}
