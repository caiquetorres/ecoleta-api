import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ItemEntity } from './entities/item.entity'

import { CreateItemInput } from './dtos/create-item.input'
import { QueryItemsArgs } from './dtos/query-items.args'
import { UpdateItemInput } from './dtos/update-item.input'

import { TypeOrmQueryService } from '../common/services/typeorm-query.service'

/**
 * Service that deals with all the business logic related with the
 * `item` entity.
 */
@Injectable()
export class ItemService extends TypeOrmQueryService<ItemEntity> {
  constructor(
    @InjectRepository(ItemEntity)
    repository: Repository<ItemEntity>,
  ) {
    super(repository)
  }

  /**
   * Method responsible for creating a new entity.
   *
   * @param input defines an object that contains all the entity data.
   * @returns an object that represents the created entity.
   */
  async createOne(input: CreateItemInput) {
    if (await this.repository.findOne({ name: input.name })) {
      throw new ConflictException(
        'An item with that name has already been registered',
      )
    }

    const item = new ItemEntity(input)
    return this.repository.save(item)
  }

  /**
   * Method responsible for finding one entity based on the `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  async getOne(id: string) {
    const item = await this.findOneById(id)

    if (!item) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ItemEntity.name} was not found`,
      )
    }

    return item
  }

  /**
   * Method responsible for finding several entities based on the
   * `query` parameter.
   *
   * @param query defines an object that contains the data needed for
   * filtering, sorting and paginating the found entity.
   * @returns an object that contains all the found data.
   */
  getMany(query: QueryItemsArgs) {
    return QueryItemsArgs.ConnectionType.createFromPromise(
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
  async updateOne(id: string, input: UpdateItemInput) {
    const item = await this.repository.findOne(id)

    if (!item) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ItemEntity.name} was not found`,
      )
    }

    return this.repository.save({
      ...item,
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
    const item = await this.repository.findOne(id)

    if (!item) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ItemEntity.name} was not found`,
      )
    }

    await this.repository.delete(item)
    return this.repository.findOne(id)
  }

  /**
   * Method that disables the entity based on the sent `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the disabled entity.
   */
  async disableOne(id: string) {
    const item = await this.repository.findOne(id)

    if (!item) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ItemEntity.name} was not found`,
      )
    }

    await this.repository.softDelete(item)
    return this.repository.findOne(id)
  }

  /**
   * Method that enables the entity based on the sent `ìd` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the enabled entity.
   */
  async enableOne(id: string) {
    const item = await this.repository.findOne(id)

    if (!item) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${ItemEntity.name} was not found`,
      )
    }

    await this.repository.restore(item)
    return this.repository.findOne(id)
  }
}
