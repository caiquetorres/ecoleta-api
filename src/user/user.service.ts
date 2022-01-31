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

import { PasswordService } from '../password/password.service'
import { PermissionService } from '../permission/permission.service'

/**
 * Service that deals with all the business logic related with the
 * `user` entity.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly permissionService: PermissionService,
  ) {}

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
  async getOneById(id: string, currentUser: UserEntity) {
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
   * Method responsible for finding one entity based on the `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  async findOneById(id: string) {
    return this.repository.findOne({ id })
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
