import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../common/decorators/current-user/current-user.decorator'

import { JwtGuard } from '../common/guards/jwt/jwt.guard'

import { UserEntity } from './entities/user.entity'

import { CreateUserInput } from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'

import { UserService } from './user.service'

/**
 * Resolver that deals with all the `queries` and `mutations` related
 * with the `UserEntity` class.
 *
 * @see {@link UserEntity}
 */
@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  /**
   * Mutation responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity data.
   * @returns an object that represents the created entity.
   */
  @Mutation(() => UserEntity, {
    name: 'createUser',
    description: 'Mutation responsible for creating a new entity',
  })
  createOne(
    @Args('input', { type: () => CreateUserInput })
    input: CreateUserInput,
  ) {
    return this.service.createOne(input)
  }

  /**
   * Query responsible for finding one entity based on the `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @param currentUser defines an object that represenst the user that is
   * requesting this action.
   * @returns an object that represents the found entity.
   */
  @UseGuards(JwtGuard)
  @Query(() => UserEntity, {
    name: 'user',
    description:
      'Query responsible for finding one entity based on the id parameter.',
  })
  getOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
    @CurrentUser()
    currentUser: UserEntity,
  ) {
    return this.service.getOne(id, currentUser)
  }

  /**
   * Query responsible for finding the data of the request user.
   *
   * @param currentUser defines an object that represents the request user.
   * @returns an object that contains all the request user data.
   */
  @UseGuards(JwtGuard)
  @Query(() => UserEntity, {
    name: 'me',
    description: 'Query responsible for finding the data of the request user.',
  })
  getMe(
    @CurrentUser()
    currentUser: UserEntity,
  ) {
    return this.service.getOne(currentUser.id, currentUser)
  }

  /**
   * Mutation responsible for updating some entity data.
   *
   * @param id defines the entity unique identifier.
   * @param input defines an object that contains all the new entity data.
   * @param currentUser defines an object that represenst the user that is
   * requesting this action.
   * @returns an object that represents the created entity.
   */
  updateOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
    @Args('input', {
      nullable: false,
      type: () => UpdateUserInput,
    })
    input: UpdateUserInput,
    @CurrentUser()
    currentUser: UserEntity,
  ) {
    return this.service.updateOne(id, input, currentUser)
  }

  /**
   * Mutation responsible for deleting some entity.
   *
   * @param id defines the entity unique identifier.
   * @param currentUser defines an object that represenst the user that is
   * requesting this action.
   * @returns an object that represents the created entity.
   */
  deleteOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
    @CurrentUser()
    currentUser: UserEntity,
  ) {
    return this.service.deleteOne(id, currentUser)
  }

  /**
   * Mutation responsible for disabling some entity.
   *
   * @param id defines the entity unique identifier.
   * @param currentUser defines an object that represenst the user that is
   * requesting this action.
   * @returns an object that represents the created entity.
   */
  disableOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
    @CurrentUser()
    currentUser: UserEntity,
  ) {
    return this.disableOne(id, currentUser)
  }

  /**
   * Mutation responsible for enabling some entity.
   *
   * @param id defines the entity unique identifier.
   * @param currentUser defines an object that represenst the user that is
   * requesting this action.
   * @returns an object that represents the created entity.
   */
  enableOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
    @CurrentUser()
    currentUser: UserEntity,
  ) {
    return this.enableOne(id, currentUser)
  }
}
