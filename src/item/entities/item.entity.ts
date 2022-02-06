import { FilterableField } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { ImageEntity } from '../../image/entities/image.entity'

import { IItem } from '../item.interface'

/**
 * Entity that represents the `item` entity.
 */
@Entity('item')
@ObjectType({
  implements: () => [BaseEntity],
})
export class ItemEntity extends BaseEntity implements IItem {
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
   * Property that defines a `string` that represents the related
   * `image` entity id.
   */
  @FilterableField({ nullable: true })
  @RelationId((item: ItemEntity) => item.image)
  imageId: string

  //#region Relations

  /**
   * @inheritdoc
   */
  @JoinColumn()
  @OneToOne(() => ImageEntity, {
    cascade: true,
  })
  image: ImageEntity

  //#endregion

  //#endregion

  constructor(partial: Partial<IItem>) {
    super()
    Object.assign(this, partial)
  }
}
