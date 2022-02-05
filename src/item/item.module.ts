import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ItemEntity } from './entities/item.entity'

import { ItemService } from './item.service'

import { ItemResolver } from './item.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [ItemService, ItemResolver],
})
export class ItemModule {}
