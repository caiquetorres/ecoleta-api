import { QueryArgsType } from '@nestjs-query/query-graphql'
import { ArgsType } from '@nestjs/graphql'

import { ImageEntity } from '../entities/image.entity'

/**
 * Args that represents all the data that can be sent to the api for
 * fetching `images` using `Cursor Pagination`.
 */
@ArgsType()
export class QueryImagesArgs extends QueryArgsType(ImageEntity) {}
