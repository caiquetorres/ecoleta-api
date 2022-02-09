import { Field, InputType } from '@nestjs/graphql'

import { CreateImageInput } from '../../image/dtos/create-image.input'

import { IItem } from '../item.interface'
import { Type } from 'class-transformer'
import { IsDefined, IsString, ValidateNested } from 'class-validator'

/**
 * Input that handles all the data needed to create a new `user`
 * entity.
 */
@InputType()
export class CreateItemInput implements Omit<IItem, 'imageId'> {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  /**
   * @inheritdoc
   */
  @Field({
    nullable: true,
  })
  @IsDefined({
    message: 'It is required to send the image',
  })
  @ValidateNested()
  @Type(() => CreateImageInput)
  image: CreateImageInput

  //#endregion
}
