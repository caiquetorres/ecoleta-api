import { RoleEnum } from '../common/models/role.enum'

/**
 * Interface that handles all the `user` entity properties.
 */
export interface IUser {
  /**
   * Property that defines a `string` object, that represents the user
   * name.
   */
  name: string

  /**
   * Property that defines a `string` object, that represents the user
   * email value.
   *
   * It must be unique.
   */
  email: string

  /**
   * Property that defines a `string` object, that represents the user
   * password.
   */
  password: string

  /**
   * Property that defines an array with all the user roles.
   */
  roles: RoleEnum[]
}
