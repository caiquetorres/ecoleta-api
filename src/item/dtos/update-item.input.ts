import { InputType, PartialType } from '@nestjs/graphql'

import { CreateItemInput } from './create-item.input'

/**
 * Input that handles all the data needed to update a new `user` entity.
 */
@InputType({
  description:
    'Input that handles all the data needed to update a new `item` entity.',
})
export class UpdateItemInput extends PartialType(CreateItemInput) {}
