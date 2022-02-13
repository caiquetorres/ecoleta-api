import { Field, ObjectType } from '@nestjs/graphql'

import { ICity } from '../interfaces/city.interface'

/**
 * Object that handles the city response data.
 */
@ObjectType()
export class CityModel implements ICity {
  /**
   * @inheritdoc
   */
  @Field()
  name: string
}
