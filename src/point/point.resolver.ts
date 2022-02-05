import { Resolver } from '@nestjs/graphql'

import { PointEntity } from './entities/point.entity'

import { PointService } from './point.service'

@Resolver(() => PointEntity)
export class PointResolver {
  constructor(private readonly service: PointService) {}
}
