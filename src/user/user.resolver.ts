import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../common/decorators/current-user/current-user.decorator'

import { JwtGuard } from '../common/guards/jwt/jwt.guard'

import { UserEntity } from './entities/user.entity'

import { CreateUserInput } from './dtos/create-user.input'

import { UserService } from './user.service'

/**
 * Resolver that deals with all the `queries` and `mutations` related
 * with the `UserEntity` class.
 *
 * @see {@link UserEntity}
 */
@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
    return this.userService.createOne(input)
  }

  /**
   * Query responsible for finding one entity based on the `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
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
    return this.userService.getOne(id, currentUser)
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
    return this.userService.getOne(currentUser.id, currentUser)
  }
}
