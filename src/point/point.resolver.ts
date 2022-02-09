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
import { AddressEntity } from './entities/address.entity'
import { PointEntity } from './entities/point.entity'

import { RoleEnum } from '../common/models/role.enum'
import { CreatePointInput } from './dtos/create-point.input'
import { QueryPointsArgs } from './dtos/query-points.args'
import { UpdatePointInput } from './dtos/update-point.input'

import { ImageService } from '../image/image.service'
import { PointService } from './point.service'

import { IPoint } from './point.interface'

/**
 * Resolver that deals with all the `queries` and `mutations`
 * related with the `point` entity class.
 *
 * @see {@link PointEntity}
 */
@Resolver(() => PointEntity)
export class PointResolver {
  constructor(
    private readonly pointService: PointService,
    private readonly imageService: ImageService,
  ) {}

  /**
   * Mutation responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity
   * data.
   * @returns an object that represents the created entity.
   */
  @Mutation(() => PointEntity, {
    name: 'createPoint',
  })
  createOne(
    @Args('input', {
      nullable: false,
      type: () => CreatePointInput,
    })
    input: CreatePointInput,
  ) {
    return this.pointService.createOne(input)
  }

  /**
   * Query responsible for finding one entity based on the id
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  @Query(() => PointEntity, {
    name: 'point',
  })
  getOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.pointService.getOne(id)
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
  getImageByPointId(
    @Parent()
    point: IPoint,
  ) {
    return this.imageService.getOne(point.imageId)
  }

  /**
   * Nested query responsible for finding the related `address`
   * entity.
   *
   * @param item defines the parent entity.
   * @returns an object that represents the found entity.
   */
  @ResolveField(() => AddressEntity, {
    name: 'address',
  })
  getAddressByPointId(
    @Parent()
    point: IPoint,
  ) {
    return this.pointService.getAddressById(point.addressId)
  }

  /**
   * Query responsible for finding several entities based on the
   * `query` parameter.
   *
   * @param query defines an object that contains the data needed for
   * filtering, sorting and paginating the found entity.
   * @returns an object that contains all the found data.
   */
  @Query(() => QueryPointsArgs.ConnectionType, {
    name: 'points',
  })
  getMany(
    @Args()
    query: QueryPointsArgs,
  ) {
    return this.pointService.getMany(query)
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
  @Mutation(() => PointEntity, {
    name: 'updatePoint',
  })
  updateOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
    @Args('input', {
      nullable: false,
      type: () => UpdatePointInput,
    })
    input: UpdatePointInput,
  ) {
    return this.pointService.updateOne(id, input)
  }

  /**
   * Mutation responsible for deleting some entity based on the sent
   * `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => PointEntity, {
    name: 'deletePoint',
  })
  deleteOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ): Promise<PointEntity> {
    return this.pointService.deleteOne(id)
  }

  /**
   * Mutation responsible for disabling some entity based on the sent
   * `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => PointEntity, {
    name: 'disablePoint',
  })
  disableOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.pointService.disableOne(id)
  }

  /**
   * Mutation responsible for enabling some entity based on the sent
   * `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the enabled entity.
   */
  @Protect(RoleEnum.admin)
  @Mutation(() => PointEntity, {
    name: 'enablePoint',
  })
  enableOne(
    @Args('id', { nullable: false }, ParseUUIDPipe)
    id: string,
  ) {
    return this.pointService.enableOne(id)
  }
}
