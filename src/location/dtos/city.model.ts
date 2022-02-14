import { Field, ObjectType } from '@nestjs/graphql'

import { ICity } from '../interfaces/city.interface'

/**
 * Object that handles the city response data.
 */
@ObjectType()
export class CityModel implements ICity {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field()
  name: string

  //#endregion

  constructor(partial: Partial<ICity>) {
    Object.assign(this, partial)
  }
}
