import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ItemEntity } from './entities/item.entity'

import { CreateItemInput } from './dtos/create-item.input'

/**
 * Service that deals with all the business logic related with the
 * `item` entity.
 */
@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
  ) {}

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
   * Method responsible for finding one entity based on the `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  findOneById(id: string) {
    return this.repository.findOne({ id })
  }
}
