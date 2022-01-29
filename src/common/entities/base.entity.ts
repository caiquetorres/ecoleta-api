import { Field, ID, InterfaceType } from '@nestjs/graphql'
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

/**
 * Abstract class that handles some useful properties and methods common
 * to all the project entities.
 */
@InterfaceType({
  isAbstract: true,
})
export abstract class BaseEntity {
  //#region Public properties

  /**
   * Property that defines an `uuid` string type, that represents the
   * entity unique identifier.
   */
  @Field(() => ID, {
    description:
      'Property that defines an `uuid` string type, that represents the entity unique identifier.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * Property that defines a `Date` object, responsible for storing the
   * time when the entity was `created`.
   */
  @Field({
    nullable: false,
    description:
      'Property that defines a `Date` object, responsible for storing the time when the entity was `created`.',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  /**
   * Property that defines a `Date` object, responsible for storing the
   * time when the entity was `updated`.
   */
  @Field({
    nullable: false,
    description:
      'Property that defines a `Date` object, responsible for storing the time when the entity was `updated`.',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  /**
   * Property that defines a `Date` object, responsible for storing the
   * time when the entity was `deleted`.
   *
   * When this property is null the entity is `active`.
   */
  @Field({
    nullable: true,
    description:
      'Property that defines a `Date` object, responsible for storing the time when the entity was `deleted`.',
  })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date

  //#endregion
}
