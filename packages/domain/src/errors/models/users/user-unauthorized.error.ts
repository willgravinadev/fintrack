import type { ProviderError } from '../../_shared/provider.error'
import type { InvalidIDError } from '../../value-objects/id/invalid-id.error'

import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = {
  motive: UserUnauthorizedMotive | null
  message: string | null
  error: null | ProviderError | InvalidIDError
}

export enum UserUnauthorizedMotive {
  INVALID_TOKEN = 'invalid token',
  USER_NOT_FOUND = 'user not found'
}

export class UserUnauthorizedError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'UserUnauthorizedError'

  readonly errorValue: null | ProviderError | InvalidIDError

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'UserUnauthorizedError'
    this.errorMessage =
      parameters.message !== null && parameters.message !== ''
        ? parameters.message
        : (parameters.motive ?? 'User is not authorized to access this resource')
    this.status = StatusError.UNAUTHORIZED
    this.errorValue = parameters.error
  }
}
