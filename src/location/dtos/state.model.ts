import { Field, ObjectType } from '@nestjs/graphql'

import { IState } from '../interfaces/state.interface'

/**
 * Object that handles the state response data.
 */
@ObjectType()
export class StateModel implements IState {
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
