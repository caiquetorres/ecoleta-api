import { TypeOrmQueryService } from '@nestjs-query/query-typeorm'
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

/**
 * Service that deals with all the business logic related with the
 * `item` entity.
 */
@Injectable()
export class ItemService extends TypeOrmQueryService<ItemEntity> {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
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
    const item = await this.findById(id)

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
  async getMany(query: QueryItemsArgs) {
    return QueryItemsArgs.ConnectionType.createFromPromise(
      (query) => this.query(query),
      query,
    )
  }
}
