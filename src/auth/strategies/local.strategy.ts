import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { AuthService } from '../auth.service'

import { Strategy } from 'passport-local'

/**
 * Strategy that is responsible for validating the username and the
 * password before the user can perform any action.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  /**
   * Method that validates the username and the password.
   *
   * @param email defines a string that represents the email.
   * @param password defines a string that represents the password.
   * @returns an object that represents the found user, if the
   * credentials match.
   */
  validate(email: string, password: string) {
    return this.authService.validateCredentials(email, password)
  }
}
