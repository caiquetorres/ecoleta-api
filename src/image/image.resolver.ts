import { Resolver } from '@nestjs/graphql'

import { ImageEntity } from './entities/image.entity'

import { ImageService } from './image.service'

/**
 * Resolver that deals with all the `queries` and `mutations` related
 * with the `image` entity.
 *
 * @see {@link ImageEntity}
 */
@Resolver(() => ImageEntity)
export class ImageResolver {
  constructor(private readonly service: ImageService) {}
}
