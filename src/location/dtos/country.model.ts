import { Field, ObjectType } from '@nestjs/graphql'

import { ICountry } from '../interfaces/country.interface'

/**
 * Object that handles the country response data.
 */
@ObjectType()
export class CountryModel implements ICountry {
  /**
   * @inheritdoc
   */
  @Field()
  name: string

  /**
   * @inheritdoc
   */
  @Field()
  iso2: string
}
