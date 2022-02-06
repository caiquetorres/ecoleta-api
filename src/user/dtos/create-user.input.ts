import { Field, InputType } from '@nestjs/graphql'

import { IUser } from '../user.interface'
import { IsDefined, IsEmail, IsString } from 'class-validator'

/**
 * Input that handles all the data needed to create a new `user`
 * entity.
 */
@InputType()
export class CreateUserInput implements Omit<IUser, 'roles'> {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @IsDefined({ message: 'It is required to send the email' })
  @IsString({ message: 'It is required to send a valid string' })
  @IsEmail({}, { message: 'It is required to send a valid e-mail' })
  email: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  password: string

  //#endregion
}
