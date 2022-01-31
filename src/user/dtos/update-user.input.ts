import { InputType, OmitType, PartialType } from '@nestjs/graphql'

import { CreateUserInput } from './create-user.input'

/**
 * Input that handles all the data needed to update some `user` entity.
 */
@InputType({
  description:
    'Input that handles all the data needed to update some `user` entity.',
})
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['email', 'password'] as const),
) {}
