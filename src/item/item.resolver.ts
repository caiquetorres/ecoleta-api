import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Protect } from '../common/decorators/protect/protect.decorator'

import { ItemEntity } from './entities/item.entity'

import { RoleEnum } from '../common/models/role.enum'
import { CreateItemInput } from './dtos/create-item.input'

import { ItemService } from './item.service'

/**
 * Resolver that deals with all the `queries` and `mutations` related
 * with the `ItemEntity` class.
 *
 * @see {@link ItemEntity}
 */
@Resolver(() => ItemEntity)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  /**
   * Mutation responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity data.
   * @returns an object that represents the created entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => ItemEntity, {
    name: 'createItem',
    description: 'Mutation responsible for creating a new entity.',
  })
  createOne(
    @Args('input', { type: () => CreateItemInput })
    input: CreateItemInput,
  ) {
    return this.itemService.createOne(input)
  }

  /**
   * Query responsible for finding one entity based on the id parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  @Query(() => ItemEntity, {
    name: 'item',
    description:
      'Query responsible for finding one entity based on the id parameter.',
  })
  getOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.itemService.getOne(id)
  }
}
