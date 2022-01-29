import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entities/user.entity'

import { RoleEnum } from '../common/models/role.enum'
import { CreateUserInput } from './dtos/create-user.input'

import { PasswordService } from '../password/password.service'

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
  ) {}

  /**
   * Method responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity data.
   * @returns an object that represents the created entity.
   */
  async createOne(input: CreateUserInput) {
    if (await this.hasUserWithEmail(input.email)) {
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
  async getOne(id: string) {
    const user = await this.repository.findOne({ id })
    if (!user) {
      throw new NotFoundException(
        `The entity identified by \'${id}\' of type \'${UserEntity.name}\' was not found`,
      )
    }
    return user
  }

  /**
   * Method that retuns a boolean value that informs if there is an user
   * with the passed email or not.
   *
   * @param email defines the email that will be searched for.
   * @returns `true` if the user was found, otherwise `false`,
   */
  private async hasUserWithEmail(email: string) {
    const user = await this.repository.findOne({ email })
    return !!user
  }
}
