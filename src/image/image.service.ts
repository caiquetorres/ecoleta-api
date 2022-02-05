import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ImageEntity } from './entities/image.entity'

import { TypeOrmQueryService } from '../common/services/typeorm-query.service'

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
}
