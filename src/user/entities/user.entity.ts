import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'

import { RoleEnum } from '../../common/models/role.enum'

import { IUser } from '../interfaces/user.interface'

/**
 * Entity that represents the `user` entity.
 */
@Entity('user')
@ObjectType({
  implements: () => [BaseEntity],
  description: 'Entity that represents the project `user` entity.',
})
export class UserEntity extends BaseEntity implements IUser {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 64,
  })
  name: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
    unique: true,
  })
  email: string

  /**
   * @inheritdoc
   */
  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
  })
  password: string

  /**
   * @inheritdoc
   */
  @Field(() => [String], { nullable: false })
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
