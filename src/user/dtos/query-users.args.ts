import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { UserEntity } from '../entities/user.entity'

/**
 * Args that represents all the data that can be sent to the api for
 * fetching `users` using `Cursor Pagination`.
 */
@ArgsType()
export class QueryUsersArgs extends QueryArgsType(UserEntity) {}
