import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { RoleEnum } from '../../models/role.enum'

/**
 * Decorator that marks a method with the allowed roles that can consume
 * it logic.
 *
 * @param roles defines an array that contains all the allowed roles.
 */
export const Roles = (...roles: RoleEnum[]): CustomDecorator =>
  SetMetadata('roles', roles)
