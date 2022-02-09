import { FilterableField } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  OneToOne,
  RelationId,
} from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { ImageEntity } from '../../image/entities/image.entity'
import { AddressEntity } from './address.entity'

import { IPoint } from '../point.interface'

/**
 * Entity that represents the `point` entity.
 */
@Entity('point')
@ObjectType({
  implements: () => [BaseEntity],
})
export class PointEntity extends BaseEntity implements IPoint {
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
  name: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: true })
  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  description: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: true })
  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  whatsapp: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: true })
  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  email: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: true })
  @RelationId((point: PointEntity) => point.image)
  imageId: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: true })
  @RelationId((point: PointEntity) => point.address)
  addressId: string

  /**
   * @inheritdoc
   */
  @JoinColumn()
  @OneToOne(() => ImageEntity, {
    cascade: true,
  })
  image: ImageEntity

  /**
   * @inheritdoc
   */
  @JoinColumn()
  @OneToOne(() => AddressEntity, {
    cascade: true,
  })
  address: AddressEntity

  //#endregion

  constructor(partial: DeepPartial<IPoint>) {
    super()
    Object.assign(this, partial)
  }
}
