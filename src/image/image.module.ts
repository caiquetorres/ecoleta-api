import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ImageEntity } from './entities/image.entity'

import { ImageService } from './image.service'

import { ImageResolver } from './image.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  providers: [ImageService, ImageResolver],
  exports: [ImageService],
})
export class ImageModule {}
