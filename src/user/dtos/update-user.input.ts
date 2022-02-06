import { Field, InputType } from '@nestjs/graphql'

import { IUser } from '../user.interface'
import { IsEmail, IsOptional, IsString } from 'class-validator'

/**
 * Input that handles all the data needed to update some `user` entity.
 */
@InputType()
export class UpdateUserInput implements Omit<IUser, 'password' | 'roles'> {
  //#region Public properties

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  /**
   * @inheritdoc
   */
  @Field({ nullable: false })
  @IsOptional()
  @IsString({ message: 'It is required to send a valid string' })
  @IsEmail({}, { message: 'It is required to send a valid e-mail' })
  email: string

  //#endregion
}
