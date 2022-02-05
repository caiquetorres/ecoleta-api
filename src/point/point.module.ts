import { Module } from '@nestjs/common'

import { PointService } from './point.service'

import { PointResolver } from './point.resolver'

@Module({
  providers: [PointService, PointResolver],
})
export class PointModule {}
