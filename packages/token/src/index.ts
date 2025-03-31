import type { IGenerateJWTTokenProvider, IVerifyJWTTokenProvider } from '@fintrack/domain'

import { env } from '@fintrack/env'
import { makeLoggerProvider } from '@fintrack/logger'

import { JsonwebtokenTokenProvider } from './providers/jsonwebtoken.token-provider'

export const makeTokenProvider = (): IGenerateJWTTokenProvider & IVerifyJWTTokenProvider => {
  return new JsonwebtokenTokenProvider(makeLoggerProvider(), {
    SECRET: env.JWT_SECRET,
    EXPIRES_IN_DAYS: env.JWT_EXPIRES_IN_DAYS,
    ALGORITHM: env.JWT_ALGORITHM,
    ISSUER: env.JWT_ISSUER
  })
}
