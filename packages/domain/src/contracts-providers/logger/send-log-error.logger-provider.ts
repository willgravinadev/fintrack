export namespace SendLogErrorLoggerProviderDTO {
  export type Parameters = Readonly<{
    message: string
    value: string | Error | unknown
  }>
  export type Result = Readonly<undefined>
}

export interface ISendLogErrorLoggerProvider {
  sendLogError(
    parameters: SendLogErrorLoggerProviderDTO.Parameters
  ): SendLogErrorLoggerProviderDTO.Result
}
