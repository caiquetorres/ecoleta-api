import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { GqlConfigService } from './common/config/gql-config.service'

import { AppResolver } from './app.resolver'
import { EnvModule } from './env/env.module'

@Module({
  imports: [
    EnvModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}
