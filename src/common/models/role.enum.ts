/**
 * Enum that contains all the project allowed roles.
 */
export enum RoleEnum {
  /**
   * The `admin` type can execute all the api `queries` and `mutations`.
   */
  admin = 'admin',

  /**
   * The `common` type is the default role. That is all the users,
   * represented by the class `UserEntity`, have, at least, this role.
   */
  common = 'common',
}
