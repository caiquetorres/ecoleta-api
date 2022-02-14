import { FilterableField } from '@nestjs-query/query-graphql'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'

import { IImage } from '../interfaces/image.interface'

/**
 * Entity that represents an application `image`.
 */
@Entity('image')
@ObjectType({
  implements: () => [BaseEntity],
})
export class ImageEntity extends BaseEntity implements IImage {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: false })
  @Column({
    type: 'text',
    nullable: false,
  })
  url: string

  /**
   * @inheritdoc
   */
  @FilterableField({ nullable: true })
  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  title: string

  //#endregion

  constructor(partial: Partial<IImage>) {
    super()
    Object.assign(this, partial)
  }
}
