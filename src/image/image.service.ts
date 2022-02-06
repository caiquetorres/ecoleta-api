import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ImageEntity } from './entities/image.entity'

import { CreateImageInput } from './dtos/create-image.input'
import { QueryImagesArgs } from './dtos/query-image.args'
import { UpdateImageInput } from './dtos/update-image.input'

import { TypeOrmQueryService } from '../common/services/type-orm-query.service'

/**
 * Service that deals with all the business logic related with the
 * `image` entity.
 */
@Injectable()
export class ImageService extends TypeOrmQueryService<ImageEntity> {
  constructor(
    @InjectRepository(ImageEntity)
    repository: Repository<ImageEntity>,
  ) {
    super(repository)
  }

  /**
   * Method responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity data.
   * @returns an object that represents the created entity.
   */
  createOne(input: CreateImageInput) {
    return this.repository.save(new ImageEntity(input))
  }

  /**
   * Method responsible for finding one entity based on the `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  async getOne(id: string) {
    const image = await this.findOneById(id)

    if (!image) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ImageEntity.name} was not found`,
      )
    }

    return image
  }

  /**
   * Method responsible for finding several entities based on the
   * `query` parameter.
   *
   * @param query defines an object that contains the data needed for
   * filtering, sorting and paginating the found entity.
   * @returns an object that contains all the found data.
   */
  getMany(query: QueryImagesArgs) {
    return QueryImagesArgs.ConnectionType.createFromPromise(
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
  async updateOne(id: string, input: UpdateImageInput) {
    const image = await this.repository.findOne(id)

    if (!image) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ImageEntity.name} was not found`,
      )
    }

    return this.repository.save({
      ...image,
      ...input,
    })
  }

  /**
   * Method that deletes the entity based on the sent `id` paramter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the deleted entity.
   */
  async deleteOne(id: string) {
    const image = await this.repository.findOne(id)

    if (!image) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ImageEntity.name} was not found`,
      )
    }

    return this.repository.remove(image)
  }

  /**
   * Method that disables the entity based on the sent `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  async disableOne(id: string) {
    const image = await this.repository.findOne(id)

    if (!image) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ImageEntity.name} was not found`,
      )
    }

    return this.repository.softRemove(image)
  }

  /**
   * Method that enables the entity based on the sent `ìd` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the enabled entity.
   */
  async enableOne(id: string) {
    const image = await this.repository.findOne(id, { withDeleted: true })

    if (!image) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ImageEntity.name} was not found`,
      )
    }

    return this.repository.recover(image)
  }
}
