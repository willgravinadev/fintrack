import type { ProviderError } from '@errors/_shared/provider.error'
import type { Either } from '@fintrack/utils'

export namespace GenerateJWTTokenProviderDTO {
  export type Parameters = Readonly<{ userID: string }>

  export type ResultFailure = Readonly<ProviderError>
  export type ResultSuccess = Readonly<{ jwtToken: string }>

  export type Result = Either<ResultFailure, ResultSuccess>
}

export interface IGenerateJWTTokenProvider {
  generateJWT(
    parameters: GenerateJWTTokenProviderDTO.Parameters
  ): GenerateJWTTokenProviderDTO.Result
}
