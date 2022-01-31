import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { UserEntity } from '../../../user/entities/user.entity'

import { RoleEnum } from '../../models/role.enum'

/**
 * Guard that is responsible for validating the request user roles
 * before the user can perform any action.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   * Method that allows the request user to continue with the operation.
   *
   * @param context defines an object that contains several useful
   * information about the request.
   * @returns true if the user is validated, otherwise false.
   */
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler())

    if (!roles) {
      return true
    }

    const user = GqlExecutionContext.create(context).getContext().req
      .user as UserEntity

    if (!user) {
      throw new ForbiddenException()
    }

    const hasRole = roles.some((role) => user.roles.includes(role))
    if (hasRole) {
      return true
    }

    throw new ForbiddenException()
  }
}
