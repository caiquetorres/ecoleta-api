import { Query } from '@nestjs-query/core'
import { FilterQueryBuilder } from '@nestjs-query/query-typeorm/dist/src/query'
import { Repository } from 'typeorm'

import { BaseEntity } from '../entities/base.entity'

/**
 * Abstract class that handles some useful properties and methods common to all of the
 * application services that deals with entity management.
 */
export abstract class TypeOrmQueryService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  /**
   * Method that finds one entity based on the `id` paramenter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  findOneById(id: string) {
    return this.repository.findOne(id)
  }

  /**
   * Method responsible for finding several entities based on the
   * `query` parameter.
   *
   * @param query defines an object that contains the data needed for
   * filtering, sorting and paginating the found entity.
   * @returns an array that contains all the found data.
   */
  query(query: Query<T>) {
    return new FilterQueryBuilder(this.repository).select(query).getMany()
  }
}
