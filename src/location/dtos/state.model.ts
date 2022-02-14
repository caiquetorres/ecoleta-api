import { Field, ObjectType } from '@nestjs/graphql'

import { IState } from '../interfaces/state.interface'

/**
 * Object that handles the state response data.
 */
@ObjectType()
export class StateModel implements IState {
  //#region Public properties

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

  //#endregion

  constructor(partial: Partial<IState>) {
    Object.assign(this, partial)
  }
}
