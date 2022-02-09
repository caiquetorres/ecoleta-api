import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { PointEntity } from '../entities/point.entity'

/**
 * Args that represents all the data that can be sent to the api for
 * fetching `points` using `Cursor Pagination`.
 */
@ArgsType()
export class QueryPointsArgs extends QueryArgsType(PointEntity) {}
