import { Injectable } from '@nestjs/common'
import { JwtSignOptions } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'

import { UserEntity } from '../../user/entities/user.entity'

import { EnvService } from '../../env/env.service'
import { AuthService } from '../auth.service'

import { ExtractJwt, Strategy } from 'passport-jwt'

/**
 * Strategy that is responsible for validating the token before the user
 * can perform any action.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    envService: EnvService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('JWT_SECRET'),
      expiresIn: envService.get('JWT_EXPIRES_IN'),
    } as JwtSignOptions)
  }

  /**
   * Method that validates the user got from the token.
   *
   * @param user defines an object that represents the requester user.
   * @returns an object that represents the authenticated user.
   */
  validate(user: UserEntity) {
    return this.authService.validateUserById(user.id)
  }
}
