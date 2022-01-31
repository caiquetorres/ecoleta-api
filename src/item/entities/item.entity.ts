import { Field, ObjectType } from '@nestjs/graphql'
import { BaseEntity, Column, Entity } from 'typeorm'

/**
 * Entity that represents the `item` entity.
 */
@ObjectType({
  implements: () => [BaseEntity],
})
@Entity('item')
export class ItemEntity extends BaseEntity {
  //#region Public properties

  /**
   * Property that defines a `string` object that represents the item
   * name.
   */
  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object that represents the item name.',
  })
  @Column({
    type: 'varchar',
    length: '32',
    nullable: false,
  })
  name: string

  //#endregion

  constructor(partial: Partial<ItemEntity>) {
    super()
    Object.assign(this, partial)
  }
}
