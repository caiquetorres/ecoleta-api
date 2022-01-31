import { applyDecorators, UseGuards } from '@nestjs/common'

import { Roles } from '../roles/roles.decorator'

import { JwtGuard } from '../../guards/jwt/jwt.guard'
import { RoleGuard } from '../../guards/role/role.guard'

import { RoleEnum } from '../../models/role.enum'

/**
 * Decorator that marks a method to be protected against some
 * unauthorized roles.
 *
 * @param roles defines an array that contains all the allowed roles.
 */
export function Protect(...roles: RoleEnum[]) {
  return applyDecorators(Roles(...roles), UseGuards(JwtGuard, RoleGuard))
}
