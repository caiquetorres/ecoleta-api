import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { ItemEntity } from '../entities/item.entity'

/**
 * Args that represents all the data that can be sent to the api for
 * fetching `items` using `Cursor Pagination`.
 */
@ArgsType()
export class QueryItemsArgs extends QueryArgsType(ItemEntity) {}
