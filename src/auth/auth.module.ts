import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { JwtConfigService } from '../common/config/jwt/jwt-config.service'
import { AuthService } from './auth.service'

import { PasswordModule } from '../password/password.module'
import { UserModule } from '../user/user.module'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    UserModule,
    PasswordModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
