import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GqlConfigService } from './common/config/gql/gql-config.service'
import { TypeOrmConfigService } from './common/config/typeorm/typeorm-config.service'

import { AppResolver } from './app.resolver'
import { EnvModule } from './env/env.module'
import { PasswordModule } from './password/password.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    PasswordModule,
    UserModule,
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}
