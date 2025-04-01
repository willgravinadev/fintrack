import type { ProviderError } from '../../errors/_shared/provider.error'
import type { Password } from '../../value-objects/password.value-object'
import type { Either } from '@fintrack/utils'

export namespace EncryptPasswordCryptoProviderDTO {
  export type Parameters = Readonly<{ password: Pick<Password, 'value'> }>

  export type ResultFailure = Readonly<ProviderError>
  export type ResultSuccess = Readonly<{ passwordEncrypted: Password }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface IEncryptPasswordCryptoProvider {
  encryptPassword(
    parameters: EncryptPasswordCryptoProviderDTO.Parameters
  ): EncryptPasswordCryptoProviderDTO.Result
}
