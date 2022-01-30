import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from '../user/entities/user.entity'

import { TokenModel } from './dtos/token.model'

import { EnvService } from '../env/env.service'
import { PasswordService } from '../password/password.service'
import { UserService } from '../user/user.service'

/**
 * Service that deals with all the business logic related with
 * authentication.
 */
@Injectable()
export class AuthService {
  /**
   * Property that defines a string that represents the maximum time for
   * which the token will be valid.
   */
  private readonly expiresIn: string

  constructor(
    envService: EnvService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
  ) {
    this.expiresIn = envService.get('JWT_EXPIRES_IN')
  }

  /**
   * Method that, given a user, it returns an object with the access
   * token.
   *
   * @param user defines an object that represents the request user.
   * @returns an object that contains the token and the maximum time for
   * which the token will be valid
   */
  async login(user: UserEntity) {
    const { id, email, roles, deletedAt } = user
    const token = await this.jwtService.signAsync(
      {
        id,
        email,
        roles,
        deletedAt,
      },
      { expiresIn: this.expiresIn },
    )
    return { token, expiresIn: this.expiresIn } as TokenModel
  }

  /**
   * Method that validates the username and the password.
   *
   * @param email defines a string that represents the email.
   * @param password defines a string that represents the password.
   * @returns an object that represents the found user, if the
   * credentials match.
   */
  async validateCredentials(username: string, password: string) {
    const user = await this.userService.getOneByEmail(username)

    if (!user) {
      throw new UnauthorizedException('The username or password are wrong')
    }

    const passwordMatches = await this.passwordService.compare(
      password,
      user.password,
    )

    if (!passwordMatches) {
      throw new UnauthorizedException('The username or password are wrong')
    }

    return user
  }
}
