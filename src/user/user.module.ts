import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './entities/user.entity'

import { UserService } from './user.service'

import { PasswordModule } from '../password/password.module'
import { UserResolver } from './user.resolver'

@Module({
  imports: [PasswordModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
