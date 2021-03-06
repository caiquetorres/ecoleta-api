import { Field, InputType } from '@nestjs/graphql'

import { IAddress } from '../interfaces/address.interface'
import { IsOptional, IsString } from 'class-validator'

/**
 * Input that handles all the data needed to update som `address`
 * entity.
 */
@InputType()
export class UpdateAddressInput implements IAddress {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  street: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  district: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  city: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  state: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  country: string

  //#endregion
}
