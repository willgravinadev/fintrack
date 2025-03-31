import type {
  ICompareEncryptedPasswordCryptoProvider,
  IEncryptPasswordCryptoProvider
} from '@fintrack/domain'

import { makeLoggerProvider } from '@fintrack/logger'

import { BcryptjsPasswordProvider } from './providers/bcryptjs.crypto-provider'

export const makeCryptoProvider = (): ICompareEncryptedPasswordCryptoProvider &
  IEncryptPasswordCryptoProvider => {
  return new BcryptjsPasswordProvider(makeLoggerProvider())
}
