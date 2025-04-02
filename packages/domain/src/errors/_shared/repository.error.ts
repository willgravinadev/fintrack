import { StatusError } from './status-error'

interface ParametersConstructorDTO {
  error: Error | unknown
  repository: {
    name: RepositoryNames
    method:
      | UsersRepositoryMethods
      | StocksRepositoryMethods
      | WalletsRepositoryMethods
      | StockTransactionsRepositoryMethods
    externalName?: RepositoryExternalName
  }
}

export enum RepositoryExternalName {
  PRISMA = 'prisma'
}

export enum RepositoryNames {
  STOCKS = 'stocks',
  STOCK_TRANSACTIONS = 'stock transactions',
  USERS = 'users',
  WALLETS = 'wallets'
}

export enum UsersRepositoryMethods {
  VALIDATE_EMAIL = 'validate email',
  CREATE = 'create',
  VALIDATE_USER_ID = 'validate user id'
}

export enum StocksRepositoryMethods {
  SEARCH_BY_SYMBOL = 'search by symbol',
  VALIDATE_ID = 'validate id'
}

export enum WalletsRepositoryMethods {
  CREATE = 'create',
  FIND_ALL_BY_USER_ID = 'find all by user id',
  VALIDATE_ID = 'validate id'
}

export enum StockTransactionsRepositoryMethods {
  CREATE = 'create',
  FIND_BY_STOCK_ID = 'find by stock id',
  FIND_BY_WALLET_ID = 'find by wallet id',
  UPDATE_DISPOSAL = 'update disposal'
}

export class RepositoryError {
  readonly status: StatusError

  readonly errorMessage: string

  readonly name: 'RepositoryError'

  readonly errorValue: Error | unknown

  constructor(parameters: ParametersConstructorDTO) {
    this.name = 'RepositoryError'
    this.errorMessage = `Error in ${parameters.repository.name} repository in ${parameters.repository.method} method.${
      parameters.repository.externalName === undefined
        ? ''
        : ` Error in external lib name: ${parameters.repository.externalName}.`
    }`
    this.status = StatusError.REPOSITORY_ERROR
    this.errorValue = parameters.error
  }
}
