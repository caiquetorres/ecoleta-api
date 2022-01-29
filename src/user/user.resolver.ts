import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

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
  @Query(() => UserEntity, {
    name: 'user',
    description:
      'Query responsible for finding one entity based on the id parameter.',
  })
  getOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.userService.getOne(id)
  }
}
