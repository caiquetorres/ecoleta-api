import { Field, ObjectType } from '@nestjs/graphql'

/**
 * Object that handles the token response data.
 */
@ObjectType()
export class TokenModel {
  /**
   * Property that defines a `string` object, that represents the token
   */
  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object, that represents the token',
  })
  token: string

  /**
   * Property that defines a `string` object, that represents the
   * expiresIn
   */
  @Field({
    nullable: false,
    description:
      'Property that defines a `string` object, that represents the expiresIn',
  })
  expiresIn: string
}
