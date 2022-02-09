import { InputType, Field } from '@nestjs/graphql'

import { CreateImageInput } from '../../image/dtos/create-image.input'
import { CreateAddressInput } from './create-address.input'

import { IPoint } from '../point.interface'
import { Type } from 'class-transformer'
import {
  IsDefined,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator'

/**
 * Input that handles all the data needed to create a new `point` entity.
 */
@InputType()
export class CreatePointInput
  implements Omit<IPoint, 'imageId' | 'addressId' | 'address'>
{
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field()
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsDefined({ message: 'It is required to send the description' })
  @IsString({ message: 'It is required to send a valid string' })
  description: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  whatsapp: string

  /**
   * @inheritdoc
   */
  /**
   * @inheritdoc
   */
  @Field()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  email: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateImageInput)
  image: CreateImageInput

  /**
   * @inheritdoc
   */
  @Field()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressInput)
  address: CreateAddressInput

  //#endregion
}
