import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'

import { RoleEnum } from '../../common/models/role.enum'

/**
 * Entity that represents the `user` entity.
 */
@Entity('user')
@ObjectType({
  implements: () => [BaseEntity],
  description: 'Entity that represents the project `user` entity.',
})
export class UserEntity extends BaseEntity {
  //#region Public properties

  /**
   * Property that defines a `string` object, that represents the user
   * name.
   */
  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object, that represents the user name.',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 64,
  })
  name: string

  /**
   * Property that defines a `string` object, that represents the user
   * email value.
   *
   * It must be unique.
   */
  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object, that represents the user email.',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
    unique: true,
  })
  email: string

  /**
   * Property that defines a `string` object, that represents the user
   * password.
   */
  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
  })
  password: string

  /**
   * Property that defines an array with all the user roles.
   */
  @Field(() => [String], {
    nullable: false,
    description: 'Property that defines an array with all the user roles.',
  })
  @Column({
    type: 'varchar',
    array: true,
    enum: RoleEnum,
    nullable: false,
    length: 16,
  })
  roles: RoleEnum[]

  //#endregion

  constructor(partial: Partial<UserEntity>) {
    super()
    Object.assign(this, partial)
  }
}
