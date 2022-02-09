import { Field, InputType } from '@nestjs/graphql'

import { IAddress } from '../address.interface'
import { IsDefined, IsString } from 'class-validator'

/**
 * Input that handles all the data needed to create a new `address`
 * entity.
 */
@InputType()
export class CreateAddressInput implements Omit<IAddress, 'pointId' | 'point'> {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field()
  @IsDefined({ message: 'It is required to send the street' })
  @IsString({ message: 'It is required to send a valid string' })
  street: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsDefined({ message: 'It is required to send the district' })
  @IsString({ message: 'It is required to send a valid string' })
  district: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsDefined({ message: 'It is required to send the city' })
  @IsString({ message: 'It is required to send a valid string' })
  city: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsDefined({ message: 'It is required to send the state' })
  @IsString({ message: 'It is required to send a valid string' })
  state: string

  /**
   * @inheritdoc
   */
  @Field()
  @IsDefined({ message: 'It is required to send the country' })
  @IsString({ message: 'It is required to send a valid string' })
  country: string

  //#endregion
}
