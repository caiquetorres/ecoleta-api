import { FilterableField } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { Column, DeepPartial, Entity } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'

import { IAddress } from '../interfaces/address.interface'

/**
 * Entity that represents the `address` entity.
 */
@Entity('address')
@ObjectType({
  implements: () => [BaseEntity],
})
export class AddressEntity extends BaseEntity implements IAddress {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: false })
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  street: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: false })
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  district: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: false })
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  city: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: false })
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  state: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: false })
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  country: string

  //#endregion

  constructor(partial: DeepPartial<IAddress>) {
    super()
    Object.assign(this, partial)
  }
}
