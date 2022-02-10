import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GqlConfigService } from './common/config/gql/gql-config.service'
import { HttpConfigService } from './common/config/http/http-config.service'
import { TypeOrmConfigService } from './common/config/typeorm/typeorm-config.service'

import { AppResolver } from './app.resolver'
import { AuthModule } from './auth/auth.module'
import { EnvModule } from './env/env.module'
import { ImageModule } from './image/image.module'
import { ItemModule } from './item/item.module'
import { PasswordModule } from './password/password.module'
import { PermissionModule } from './permission/permission.module'
import { PointModule } from './point/point.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    AuthModule,
    PasswordModule,
    PermissionModule,
    UserModule,
    ItemModule,
    ImageModule,
    PointModule,
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}
