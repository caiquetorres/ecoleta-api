import { Field, InputType } from '@nestjs/graphql'

import { IImage } from '../interfaces/image.interface'
import { IsOptional, IsString, IsUrl } from 'class-validator'

/**
 * Input that handles all the data needed to update some `image`
 * entity.
 */
@InputType()
export class UpdateImageInput implements IImage {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @IsOptional()
  @IsUrl({}, { message: 'It is required to send a valid url' })
  @IsString({ message: 'It is required to send a valid string' })
  url: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  title: string

  //#endregion
}
