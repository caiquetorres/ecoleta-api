import { ParseUUIDPipe } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

import { Protect } from '../common/decorators/protect/protect.decorator'

import { ImageEntity } from '../image/entities/image.entity'
import { ItemEntity } from './entities/item.entity'

import { RoleEnum } from '../common/models/role.enum'
import { CreateItemInput } from './dtos/create-item.input'
import { QueryItemsArgs } from './dtos/query-items.args'
import { UpdateItemInput } from './dtos/update-item.input'

import { ImageService } from '../image/image.service'
import { ItemService } from './item.service'

import { IItem } from './interfaces/item.interface'

/**
 * Resolver that deals with all the `queries` and `mutations` related
 * with the `ItemEntity` class.
 *
 * @see {@link ItemEntity}
 */
@Resolver(() => ItemEntity)
export class ItemResolver {
  constructor(
    private readonly itemService: ItemService,
    private readonly imageService: ImageService,
  ) {}

  /**
   * Mutation responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity
   * data.
   * @returns an object that represents the created entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => ItemEntity, {
    name: 'createItem',
  })
  createOne(
    @Args('input', {
      nullable: false,
      type: () => CreateItemInput,
    })
    input: CreateItemInput,
  ) {
    return this.itemService.createOne(input)
  }

  /**
   * Query responsible for finding one entity based on the id
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  @Query(() => ItemEntity, {
    name: 'item',
  })
  getOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.itemService.getOne(id)
  }

  /**
   * Nested query responsible for finding the related `image` entity.
   *
   * @param item defines the parent entity.
   * @returns an object that represents the found entity.
   */
  @ResolveField(() => ImageEntity, {
    name: 'image',
  })
  getImage(
    @Parent()
    item: IItem,
  ) {
    return this.imageService.getOne(item.imageId)
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
  })
  getMany(
    @Args()
    query: QueryItemsArgs,
  ) {
    return this.itemService.getMany(query)
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
  })
  updateOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
    @Args('input', {
      nullable: false,
      type: () => UpdateItemInput,
    })
    input: UpdateItemInput,
  ) {
    return this.itemService.updateOne(id, input)
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
  })
  deleteOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.itemService.deleteOne(id)
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
  })
  disableOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.itemService.disableOne(id)
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
  })
  enableOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.itemService.enableOne(id)
  }
}
