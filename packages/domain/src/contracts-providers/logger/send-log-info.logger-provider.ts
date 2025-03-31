export namespace SendLogInfoLoggerProviderDTO {
  export type Parameters = Readonly<{
    message: string
  }>
  export type Result = Readonly<undefined>
}

export interface ISendLogInfoLoggerProvider {
  sendLogInfo(
    parameters: SendLogInfoLoggerProviderDTO.Parameters
  ): SendLogInfoLoggerProviderDTO.Result
}
