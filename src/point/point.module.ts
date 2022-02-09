import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AddressEntity } from './entities/address.entity'
import { PointEntity } from './entities/point.entity'

import { PointService } from './point.service'

import { PointResolver } from './point.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([PointEntity, AddressEntity])],
  providers: [PointService, PointResolver],
})
export class PointModule {}
