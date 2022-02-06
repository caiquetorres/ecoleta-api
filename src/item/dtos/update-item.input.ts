import { Field, InputType } from '@nestjs/graphql'

import { UpdateImageInput } from '../../image/dtos/update-image.input'

import { IItem } from '../item.interface'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

/**
 * Input that handles all the data needed to update a new `user`
 * entity.
 */
@InputType()
export class UpdateItemInput implements Omit<IItem, 'imageId'> {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateImageInput)
  image: UpdateImageInput

  //#endregion
}
