import { Resolver } from '@nestjs/graphql'

import { ItemEntity } from './entities/item.entity'

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
}
