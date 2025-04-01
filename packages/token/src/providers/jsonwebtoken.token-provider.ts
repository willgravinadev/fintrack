import {
  type GenerateJWTTokenProviderDTO,
  ID,
  type IGenerateJWTTokenProvider,
  type ISendLogErrorLoggerProvider,
  type IVerifyJWTTokenProvider,
  ModelName,
  ProviderError,
  ProvidersNames,
  TokenProviderMethods,
  type VerifyJWTTokenProviderDTO
} from '@fintrack/domain'
import { failure, success } from '@fintrack/utils'
import jwt from 'jsonwebtoken'

/**
 * Defines the expected JWT payload structure returned by jsonwebtoken's `verify` method.
 */
interface ITokenJwtPayloadDTO {
  iat: number
  exp: number
  sub: string
}

export class JsonwebtokenTokenProvider
  implements IGenerateJWTTokenProvider, IVerifyJWTTokenProvider
{
  constructor(
    private readonly loggerProvider: ISendLogErrorLoggerProvider,
    private readonly environments: {
      SECRET: string
      EXPIRES_IN_DAYS: number
      ALGORITHM: 'HS256' | 'HS384' | 'HS512'
      ISSUER: string
    }
  ) {}

  /**
   * Generates a JWT token for the given user.
   * If `isRefreshToken` is true, it uses the refresh token expiry, otherwise the access token expiry.
   */

  public generateJWT(
    parameters: GenerateJWTTokenProviderDTO.Parameters
  ): GenerateJWTTokenProviderDTO.Result {
    try {
      const { SECRET, ISSUER, ALGORITHM, EXPIRES_IN_DAYS } = this.environments

      const token = jwt.sign({}, SECRET, {
        subject: parameters.userID,
        issuer: ISSUER,
        expiresIn: `${EXPIRES_IN_DAYS}days`,
        algorithm: ALGORITHM
      })

      return success({ jwtToken: token })
    } catch (error: unknown) {
      const errorProvider = this.createProviderError(error, TokenProviderMethods.GENERATE_JWT)
      this.loggerProvider.sendLogError({
        message: errorProvider.errorMessage,
        value: errorProvider
      })
      return failure(errorProvider)
    }
  }

  /**
   * Verifies a given JWT token and returns the extracted user ID if valid.
   */
  public verifyJWT(
    parameters: VerifyJWTTokenProviderDTO.Parameters
  ): VerifyJWTTokenProviderDTO.Result {
    try {
      const payload = jwt.verify(
        parameters.jwtToken,
        this.environments.SECRET
      ) as ITokenJwtPayloadDTO

      const resultValidateID = ID.validate({
        id: payload.sub,
        modelNameOrValueObjectName: ModelName.USER
      })

      if (resultValidateID.isFailure()) {
        return failure(resultValidateID.value)
      }

      return success({ userID: resultValidateID.value.idValidated })
    } catch (error: unknown) {
      const errorProvider = this.createProviderError(error, TokenProviderMethods.VERIFY_JWT)
      this.loggerProvider.sendLogError({
        message: errorProvider.errorMessage,
        value: errorProvider
      })
      return failure(errorProvider)
    }
  }

  /**
   * Creates a standardized ProviderError for logging and returning in failure cases.
   */
  private createProviderError(error: unknown, method: TokenProviderMethods): ProviderError {
    return new ProviderError({
      error,
      provider: {
        name: ProvidersNames.TOKEN,
        method,
        externalName: 'jsonwebtoken'
      }
    })
  }
}
