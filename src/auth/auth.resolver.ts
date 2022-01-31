import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../common/decorators/current-user/current-user.decorator'

import { LocalGuard } from '../common/guards/local/local.guard'

import { UserEntity } from '../user/entities/user.entity'

import { LoginInput } from './dtos/login.input'
import { TokenModel } from './dtos/token.model'

import { AuthService } from './auth.service'

/**
 * Resolver that deals with all the `queries` and `mutations` related
 * with authorizations.
 */
@Resolver(() => TokenModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * Mutation responsible for validating the username and password.
   *
   * @param _input defines an object that contains the username and the
   * password.
   * @param user defines an object that represents the request user data.
   * @returns an object that contains the token.
   */
  @UseGuards(LocalGuard)
  @Mutation(() => TokenModel, {
    name: 'login',
    description:
      'Mutation responsible for validating the username and password.',
  })
  login(
    @Args('input', {
      type: () => LoginInput,
    })
    _input: LoginInput,
    @CurrentUser()
    user: UserEntity,
  ) {
    return this.authService.login(user)
  }
}
