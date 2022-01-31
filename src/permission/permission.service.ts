import { Injectable } from '@nestjs/common'

import { UserEntity } from '../user/entities/user.entity'

import { RoleEnum } from '../common/models/role.enum'

/**
 * Service that deals with all the application permission business logic.
 */
@Injectable()
export class PermissionService {
  /**
   * Method that checks if some user has the permissions to execute some
   * action in the application.
   *
   * @param currentUser defines and object that represents the user that
   * is trying to access some route or doing something related with the
   * `targetUserId`.
   * @param targetUserId defines which user this entity or route is
   * related to.
   * @returns true if the user has the permissions, otherwise false.
   */
  hasPermission(targetUserId: string, currentUser: UserEntity) {
    return this.isAdmin(currentUser) || targetUserId === currentUser.id
  }

  /**
   * Method that checks if the user has the `admin` role.
   *
   * @param currentUser defines and object that represents the user that
   * is trying to access some route or doing something related with the
   * `targetUserId`.
   * @returns true if the user has the "Admin" role, otherwise false.
   */
  private isAdmin(currentUser: UserEntity) {
    return (
      currentUser &&
      currentUser.roles &&
      currentUser.roles.includes(RoleEnum.admin)
    )
  }
}
