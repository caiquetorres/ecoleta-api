import { ParseUUIDPipe } from '@nestjs/common'
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql'

import { Protect } from '../common/decorators/protect/protect.decorator'

import { ImageEntity } from './entities/image.entity'

import { RoleEnum } from '../common/models/role.enum'
import { CreateImageInput } from './dtos/create-image.input'
import { QueryImagesArgs } from './dtos/query-image.args'
import { UpdateImageInput } from './dtos/update-image.input'

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

  /**
   * Mutation responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity data.
   * @returns an object that represents the created entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => ImageEntity, {
    name: 'createImage',
    description: 'Mutation responsible for creating a new entity.',
  })
  createOne(
    @Args('input', { type: () => CreateImageInput })
    input: CreateImageInput,
  ) {
    return this.service.createOne(input)
  }

  /**
   * Query responsible for finding one entity based on the id
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  @Protect(RoleEnum.admin)
  @Query(() => ImageEntity, {
    name: 'image',
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
  @Protect(RoleEnum.admin)
  @Query(() => QueryImagesArgs.ConnectionType, {
    name: 'images',
    description:
      'Query responsible for finding several entities based on the input data.',
  })
  getMany(
    @Args()
    query: QueryImagesArgs,
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
  @Mutation(() => ImageEntity, {
    name: 'updateImage',
    description:
      'responsible for updating some entity based on the sent `input` parameter.',
  })
  updateOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
    @Args('input', { type: () => UpdateImageInput })
    input: UpdateImageInput,
  ) {
    return this.service.updateOne(id, input)
  }

  /**
   * Mutation responsible for deleting some entity based on the sent `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => ImageEntity, {
    name: 'deleteImage',
    description:
      'Mutation responsible for deleting some entity based on the `id` parameter.',
  })
  deleteOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ): Promise<ImageEntity> {
    return this.service.deleteOne(id)
  }

  /**
   * Mutation responsible for disabling some entity based on the sent `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => ImageEntity, {
    name: 'disableImage',
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
  @Mutation(() => ImageEntity, {
    name: 'enableImage',
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
