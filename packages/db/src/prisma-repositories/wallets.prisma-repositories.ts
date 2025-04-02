import type { Database } from '../database'

import {
  type CreateWalletsRepositoryDTO,
  type FindAllByUserIDWalletsRepositoryDTO,
  type ICreateWalletsRepository,
  ID,
  type IFindAllByUserIDWalletsRepository,
  type ISendLogErrorLoggerProvider,
  type IValidateIDWalletsRepository,
  RepositoryError,
  RepositoryExternalName,
  RepositoryNames,
  type ValidateIDWalletsRepositoryDTO,
  type Wallet,
  WalletsRepositoryMethods
} from '@fintrack/domain'
import { failure, success } from '@fintrack/utils'

export class WalletsPrismaRepository
  implements
    ICreateWalletsRepository,
    IFindAllByUserIDWalletsRepository,
    IValidateIDWalletsRepository
{
  constructor(
    private readonly loggerProvider: ISendLogErrorLoggerProvider,
    private readonly database: Database
  ) {}

  public async create(
    parameters: CreateWalletsRepositoryDTO.Parameters
  ): CreateWalletsRepositoryDTO.Result {
    try {
      const { newWallet } = parameters
      await this.database.prisma.wallet.create({
        data: {
          name: newWallet.name,
          ownerID: newWallet.owner.id.value,
          createdAt: newWallet.createdAt.value,
          updatedAt: newWallet.updatedAt.value,
          id: newWallet.id.value
        },
        select: { id: true }
      })

      return success(null)
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.WALLETS,
          method: WalletsRepositoryMethods.CREATE,
          externalName: RepositoryExternalName.PRISMA
        }
      })
      this.loggerProvider.sendLogError({
        message: repositoryError.errorMessage,
        value: repositoryError
      })

      return failure(repositoryError)
    }
  }

  public async findAllByUserID(
    parameters: FindAllByUserIDWalletsRepositoryDTO.Parameters
  ): FindAllByUserIDWalletsRepositoryDTO.Result {
    try {
      const found = await this.database.prisma.wallet.findMany({
        where: { ownerID: parameters.user.id.value }
      })

      if (found.length === 0) {
        return success({ wallets: [] })
      }

      const wallets: Array<Pick<Wallet, 'id' | 'name' | 'owner'>> = found.map((wallet) => ({
        id: new ID({ id: wallet.id }),
        name: wallet.name,
        owner: { id: new ID({ id: wallet.ownerID }) }
      }))

      return success({ wallets })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.WALLETS,
          method: WalletsRepositoryMethods.FIND_ALL_BY_USER_ID,
          externalName: RepositoryExternalName.PRISMA
        }
      })
      this.loggerProvider.sendLogError({
        message: repositoryError.errorMessage,
        value: repositoryError
      })

      return failure(repositoryError)
    }
  }

  public async validateID(
    parameters: ValidateIDWalletsRepositoryDTO.Parameters
  ): ValidateIDWalletsRepositoryDTO.Result {
    try {
      const found = await this.database.prisma.wallet.findUnique({
        where: { id: parameters.wallet.id.value }
      })

      if (found === null) {
        return success({ foundWallet: null })
      }

      const foundWallet: Pick<Wallet, 'id' | 'owner'> = {
        id: new ID({ id: found.id }),
        owner: { id: new ID({ id: found.ownerID }) }
      }

      return success({ foundWallet })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.WALLETS,
          method: WalletsRepositoryMethods.VALIDATE_ID,
          externalName: RepositoryExternalName.PRISMA
        }
      })
      this.loggerProvider.sendLogError({
        message: repositoryError.errorMessage,
        value: repositoryError
      })

      return failure(repositoryError)
    }
  }
}
