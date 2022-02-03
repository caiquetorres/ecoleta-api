import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entities/user.entity'

import { RoleEnum } from '../common/models/role.enum'
import { CreateUserInput } from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'

import { TypeOrmQueryService } from '../common/services/typeorm-query.service'
import { PasswordService } from '../password/password.service'
import { PermissionService } from '../permission/permission.service'

/**
 * Service that deals with all the business logic related with the
 * `user` entity.
 */
@Injectable()
export class UserService extends TypeOrmQueryService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly permissionService: PermissionService,
  ) {
    super(repository)
  }

  /**
   * Method responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity data.
   * @returns an object that represents the created entity.
   */
  async createOne(input: CreateUserInput) {
    if (await this.findOneByEmail(input.email)) {
      throw new ConflictException(
        'An user with that e-mail has already been registered',
      )
    }

    const password = await this.passwordService.encrypt(input.password)
    const user = new UserEntity({
      ...input,
      password,
      roles: [RoleEnum.common],
    })

    return this.repository.save(user)
  }

  /**
   * Method responsible for finding one entity based on the `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  async getOne(id: string, currentUser: UserEntity) {
    if (!this.permissionService.hasPermission(id, currentUser)) {
      throw new ForbiddenException(
        'You have no permission to access these sources.',
      )
    }

    const user = await this.findOneById(id)
    if (!user) {
      throw new NotFoundException(
        `The entity identified by \'${id}\' of type \'${UserEntity.name}\' was not found`,
      )
    }
    return user
  }

  /**
   * Method responsible for updating some entity based on the sent
   * `input` parameter.
   *
   * @param id defines the entity unique identifier.
   * @param input defines an object that represents the entity new
   * data.
   * @returns an object that represents the updated entity.
   */
  async updateOne(id: string, input: UpdateUserInput, currentUser: UserEntity) {
    if (!this.permissionService.hasPermission(id, currentUser)) {
      throw new ForbiddenException(
        'You have no permission to access these sources.',
      )
    }

    const user = await this.repository.findOne(id)

    if (!user) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${UserEntity.name} was not found`,
      )
    }

    return this.repository.save({
      ...user,
      ...input,
    })
  }

  /**
   * Method that deletes the entity based on the sent `id` paramter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(id: string, currentUser: UserEntity) {
    if (!this.permissionService.hasPermission(id, currentUser)) {
      throw new ForbiddenException(
        'You have no permission to access these sources.',
      )
    }

    const user = await this.repository.findOne(id)

    if (!user) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${UserEntity.name} was not found`,
      )
    }

    await this.repository.delete(user)
    return this.repository.findOne(id)
  }

  /**
   * Method that disables the entity based on the sent `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  async disableOne(id: string, currentUser: UserEntity) {
    if (!this.permissionService.hasPermission(id, currentUser)) {
      throw new ForbiddenException(
        'You have no permission to access these sources.',
      )
    }

    const user = await this.repository.findOne(id)

    if (!user) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${UserEntity.name} was not found`,
      )
    }

    await this.repository.softDelete(user)
    return this.repository.findOne(id)
  }

  /**
   * Method that enables the entity based on the sent `ìd` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the enabled entity.
   */
  async enableOne(id: string, currentUser: UserEntity) {
    if (!this.permissionService.hasPermission(id, currentUser)) {
      throw new ForbiddenException(
        'You have no permission to access these sources.',
      )
    }

    const user = await this.repository.findOne(id)

    if (!user) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${UserEntity.name} was not found`,
      )
    }

    await this.repository.restore(user)
    return this.repository.findOne(id)
  }

  /**
   * Method that retuns a boolean value that informs if there is an user
   * with the passed email or not.
   *
   * @param email defines the email that will be searched for.
   * @returns `true` if the user was found, otherwise `false`,
   */
  findOneByEmail(email: string) {
    return this.repository.findOne({ email })
  }
}
