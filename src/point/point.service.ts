import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AddressEntity } from './entities/address.entity'
import { PointEntity } from './entities/point.entity'

import { CreatePointInput } from './dtos/create-point.input'
import { QueryPointsArgs } from './dtos/query-points.args'
import { UpdatePointInput } from './dtos/update-point.input'

import { TypeOrmQueryService } from '../common/services/type-orm-query.service'

/**
 * Service that deals with all the business logic related with the
 * `point` entity.
 */
@Injectable()
export class PointService extends TypeOrmQueryService<PointEntity> {
  constructor(
    @InjectRepository(PointEntity)
    repository: Repository<PointEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {
    super(repository)
  }

  /**
   * Method responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity
   * data.
   * @returns an object that represents the created entity.
   */
  async createOne(input: CreatePointInput) {
    const point = new PointEntity(input)
    return this.repository.save(point)
  }

  /**
   * Method responsible for finding one entity based on the `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  async getOne(id: string) {
    const point = await this.findOneById(id)

    if (!point) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${PointEntity.name} was not found`,
      )
    }

    return point
  }

  /**
   * Method responsible for finding several entities based on the
   * `query` parameter.
   *
   * @param query defines an object that contains the data needed for
   * filtering, sorting and paginating the found entity.
   * @returns an object that contains all the found data.
   */
  getMany(query: QueryPointsArgs) {
    return QueryPointsArgs.ConnectionType.createFromPromise(
      (query) => this.query(query),
      query,
    )
  }

  /**
   * Method responsible for updating some entity based on the sent
   * `input` parameter.
   *
   * @param id defines the entity unique identifier.
   * @param input defines an object that represents the entity new
   * data.
   * @returns an object that represents the updated entity.
   */
  async updateOne(id: string, input: UpdatePointInput) {
    const point = await this.repository.findOne(id, {
      relations: ['image', 'address'],
    })

    if (!point) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${PointEntity.name} was not found`,
      )
    }

    const { image, address, ...rest } = input

    point.image = {
      ...point.image,
      ...image,
    }

    point.address = {
      ...point.address,
      ...address,
    }

    return this.repository.save({
      ...point,
      ...rest,
    })
  }

  /**
   * Method that deletes the entity based on the sent `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(id: string) {
    const point = await this.repository.findOne(id, {
      relations: ['image', 'address'],
    })

    if (!point) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${PointEntity.name} was not found`,
      )
    }

    return await this.repository.remove(point)
  }

  /**
   * Method that disables the entity based on the sent `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  async disableOne(id: string) {
    const point = await this.repository.findOne(id, {
      relations: ['image', 'address'],
    })

    if (!point) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${PointEntity.name} was not found`,
      )
    }

    return this.repository.softRemove(point)
  }

  /**
   * Method that enables the entity based on the sent `ìd` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the enabled entity.
   */
  async enableOne(id: string) {
    const point = await this.repository.findOne(id, {
      withDeleted: true,
      relations: ['image', 'address'],
    })

    if (!point) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${PointEntity.name} was not found`,
      )
    }

    return this.repository.recover(point)
  }
}
