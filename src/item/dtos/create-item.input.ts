import { Field, InputType } from '@nestjs/graphql'

import { IsDefined, IsString } from 'class-validator'

/**
 * Input that handles all the data needed to create a new `user` entity.
 */
@InputType({
  description:
    'Input that handles all the data needed to create a new `item` entity.',
})
export class CreateItemInput {
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
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  //#endregion
}
