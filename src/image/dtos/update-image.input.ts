import { InputType } from '@nestjs/graphql'

import { CreateImageInput } from './create-image.input'

/**
 * Input that handles all the data needed to update some `image`
 * entity.
 */
@InputType({
  description:
    'Input that handles all the data needed to update some `image` entity.',
})
export class UpdateImageInput extends CreateImageInput {}
