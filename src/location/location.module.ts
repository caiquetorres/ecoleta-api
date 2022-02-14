import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { LocationService } from './location.service'

import { LocationResolver } from './location.resolver'

@Module({
  imports: [HttpModule],
  providers: [LocationResolver, LocationService],
})
export class LocationModule {}
