import { Field, InputType } from '@nestjs/graphql'

import { IsDefined, IsString } from 'class-validator'

/**
 * Input that handles all the data needed to perform the login.
 */
@InputType()
export class LoginInput {
  /**
   * Property that defines a `string` object, that represents the
   * username.
   */
  @IsDefined({ message: 'It is required to send the username' })
  @IsString({ message: 'It is required to send a valid string' })
  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object, that represents the username',
  })
  username: string

  /**
   * Property that defines a `string` object, that represents the
   * password.
   */
  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object, that represents the password',
  })
  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  password: string
}
