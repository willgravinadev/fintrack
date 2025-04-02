import { StatusError } from '../../_shared/status-error'

type ParametersConstructorDTO = {
  disposalPriceInCents: number
}

export class InvalidDisposalPriceError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'InvalidDisposalPriceError'

  readonly errorValue: null

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'InvalidDisposalPriceError'
    this.errorMessage = `Invalid disposal price: ${parameters.disposalPriceInCents}. It must be greater than zero`
    this.status = StatusError.INVALID
    this.errorValue = null
  }
}
