import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ItemEntity } from './entities/item.entity'

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
}
