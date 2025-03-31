import type { Database } from '../database'

import {
  type CreateUsersRepositoryDTO,
  Email,
  type ICreateUsersRepository,
  ID,
  type ISendLogErrorLoggerProvider,
  type IValidateEmailUsersRepository,
  ModelName,
  RepositoryError,
  RepositoryExternalName,
  RepositoryNames,
  UsersRepositoryMethods,
  type ValidateEmailUsersRepositoryDTO
} from '@fintrack/domain'
import { failure, success } from '@fintrack/utils'

export class UsersPrismaRepository
  implements IValidateEmailUsersRepository, ICreateUsersRepository
{
  constructor(
    private readonly loggerProvider: ISendLogErrorLoggerProvider,
    private readonly database: Database
  ) {}
  public async create(
    parameters: CreateUsersRepositoryDTO.Parameters
  ): CreateUsersRepositoryDTO.Result {
    try {
      const { newUser } = parameters
      await this.database.prisma.user.create({
        data: {
          email: newUser.email.value,
          passwordHash: newUser.password.value,
          name: newUser.name,
          createdAt: newUser.createdAt.value,
          id: newUser.id.value,
          avatarURL: null,
          deletedAt: null,
          updatedAt: newUser.updatedAt.value
        },
        select: { id: true }
      })

      return success(null)
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.USERS,
          method: UsersRepositoryMethods.CREATE,
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

  public async validateEmail(
    parameters: ValidateEmailUsersRepositoryDTO.Parameters
  ): ValidateEmailUsersRepositoryDTO.Result {
    try {
      const found = await this.database.prisma.user.findUnique({
        where: { email: parameters.email.value },
        select: { id: true, email: true, passwordHash: true }
      })

      if (found === null) return success({ foundUser: null })

      const resultValidateID = ID.validate({
        id: found.id,
        modelNameOrValueObjectName: ModelName.USER
      })
      if (resultValidateID.isFailure()) return failure(resultValidateID.value)
      const { idValidated: userID } = resultValidateID.value

      const resultValidateEmail = Email.validateEmailAddress({ email: found.email })
      if (resultValidateEmail.isFailure()) return failure(resultValidateEmail.value)
      const { emailValidated: userEmail } = resultValidateEmail.value

      return success({
        foundUser: {
          id: userID,
          email: userEmail,
          password: found.passwordHash ? { value: found.passwordHash, isEncrypted: true } : null
        }
      })
    } catch (error: unknown) {
      const repositoryError = new RepositoryError({
        error,
        repository: {
          name: RepositoryNames.USERS,
          method: UsersRepositoryMethods.VALIDATE_EMAIL,
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
