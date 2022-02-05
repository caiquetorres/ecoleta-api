import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PointEntity } from './entities/point.entity'

import { TypeOrmQueryService } from '../common/services/typeorm-query.service'

@Injectable()
export class PointService extends TypeOrmQueryService<PointEntity> {
  constructor(
    @InjectRepository(PointEntity)
    repository: Repository<PointEntity>,
  ) {
    super(repository)
  }
}
