import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AddressEntity } from './entities/address.entity'

import { TypeOrmQueryService } from '../common/services/type-orm-query.service'

/**
 * Service that deals with all the business logic related with the
 * `address` entity.
 */
@Injectable()
export class AddressService extends TypeOrmQueryService<AddressEntity> {
  constructor(
    @InjectRepository(AddressEntity)
    repository: Repository<AddressEntity>,
  ) {
    super(repository)
  }

  /**
   * Method responsible for finding one entity based on the `id`
   * parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  async getOne(id: string) {
    const address = await this.findOneById(id)

    if (!address) {
      throw new NotFoundException(
        `The entity identified by ${id} of type ${AddressEntity.name} was not found`,
      )
    }

    return address
  }
}
