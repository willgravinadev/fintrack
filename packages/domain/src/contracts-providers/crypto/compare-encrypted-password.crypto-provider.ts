import type { ProviderError } from '@errors/_shared/provider.error'
import type { Either } from '@fintrack/utils'
import type { Password } from '@value-objects/password.value-object'

export namespace CompareEncryptedPasswordCryptoProviderDTO {
  export type Parameters = Readonly<{
    passwordEncrypted: Pick<Password, 'value'>
    passwordDecrypted: Pick<Password, 'value'>
  }>

  export type ResultFailure = Readonly<ProviderError>
  export type ResultSuccess = Readonly<{ isPasswordMatch: boolean }>

  export type Result = Promise<Either<ResultFailure, ResultSuccess>>
}

export interface ICompareEncryptedPasswordCryptoProvider {
  compareEncryptedPassword(
    parameters: CompareEncryptedPasswordCryptoProviderDTO.Parameters
  ): CompareEncryptedPasswordCryptoProviderDTO.Result
}
