import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { Protect } from '../common/decorators/protect/protect.decorator'

import { ItemEntity } from './entities/item.entity'

import { RoleEnum } from '../common/models/role.enum'
import { CreateItemInput } from './dtos/create-item.input'
import { QueryItemsArgs } from './dtos/query-items.args'
import { UpdateItemInput } from './dtos/update-item.input'

import { ItemService } from './item.service'

/**
 * Resolver that deals with all the `queries` and `mutations` related
 * with the `ItemEntity` class.
 *
 * @see {@link ItemEntity}
 */
@Resolver(() => ItemEntity)
export class ItemResolver {
  constructor(private readonly service: ItemService) {}

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
    return this.service.createOne(input)
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
    return this.service.getOne(id)
  }

  /**
   * Query responsible for finding several entities based on the
   * `query` parameter.
   *
   * @param query defines an object that contains the data needed for
   * filtering, sorting and paginating the found entity.
   * @returns an object that contains all the found data.
   */
  @Query(() => QueryItemsArgs.ConnectionType, {
    name: 'items',
    description:
      'Query responsible for finding several entities based on the input data.',
  })
  getMany(
    @Args()
    query: QueryItemsArgs,
  ) {
    return this.service.getMany(query)
  }

  /**
   * Mutation responsible for updating some entity based on the sent
   * `input` parameter.
   *
   * @param id defines the entity unique identifier.
   * @param input defines an object that represents the entity new
   * data.
   * @returns an object that represents the updated entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => ItemEntity, {
    name: 'updateItem',
    description:
      'responsible for updating some entity based on the sent `input` parameter.',
  })
  updateOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
    @Args('input', { type: () => UpdateItemInput })
    input: UpdateItemInput,
  ) {
    return this.service.updateOne(id, input)
  }

  /**
   * Mutation responsible for deleting some entity based on the sent
   * `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => ItemEntity, {
    name: 'deleteItem',
    description:
      'Mutation responsible for deleting some entity based on the `id` parameter.',
  })
  deleteOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ): Promise<ItemEntity> {
    return this.service.deleteOne(id)
  }

  /**
   * Mutation responsible for disabling some entity based on the sent
   * `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => ItemEntity, {
    name: 'disableItem',
    description:
      'Mutation responsible for disabling some entity based on the `id` parameter.',
  })
  disableOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.service.disableOne(id)
  }

  /**
   * Mutation responsible for enabling some entity based on the sent
   * `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the enabled entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => ItemEntity, {
    name: 'enableItem',
    description:
      'Mutation responsible for enabling some entity based on the `id` parameter.',
  })
  enableOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.service.enableOne(id)
  }
}
