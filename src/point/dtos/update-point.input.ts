import { InputType } from '@nestjs/graphql'

import { CreatePointInput } from './create-point.input'

@InputType()
export class UpdatePointInput extends CreatePointInput {}
