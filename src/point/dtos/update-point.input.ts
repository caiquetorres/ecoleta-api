import { Field, InputType } from '@nestjs/graphql'

import { UpdateImageInput } from '../../image/dtos/update-image.input'
import { UpdateAddressInput } from './update-address.input'

import { IPoint } from '../point.interface'
import { Type } from 'class-transformer'
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator'

/**
 * Input that handles all the data needed to update som `point`
 * entity.
 */
@InputType()
export class UpdatePointInput
  implements Omit<IPoint, 'imageId' | 'addressId' | 'address'>
{
  //#region Public methods

  /**
   * @inheritdoc
   */
  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  description: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  whatsapp: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'It is required to send a valid email' })
  @IsString({ message: 'It is required to send a valid string' })
  email: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressInput)
  address: UpdateAddressInput

  /**
   * @inheritdoc
   */
  @Field({ nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateImageInput)
  image: UpdateImageInput

  //#endregion
}
