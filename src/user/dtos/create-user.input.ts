import { Field, InputType } from '@nestjs/graphql'

import { IsDefined, IsEmail, IsString } from 'class-validator'

/**
 * Input that handles all the data needed to create a new `user` entity.
 */
@InputType({
  description:
    'Input that handles all the data needed to create a new `user` entity.',
})
export class CreateUserInput {
  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object, that represents the user name.',
  })
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object, that represents the user email.',
  })
  @IsDefined({ message: 'It is required to send the email' })
  @IsString({ message: 'It is required to send a valid string' })
  @IsEmail({}, { message: 'It is required to send a valid e-mail' })
  email: string

  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object, that represents the user password.',
  })
  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  password: string
}
