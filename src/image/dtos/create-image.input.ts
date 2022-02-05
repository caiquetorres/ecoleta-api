import { Field, InputType } from '@nestjs/graphql'

import { IImage } from '../image.interface'
import { IsDefined, IsString, IsUrl } from 'class-validator'

/**
 * Input that handles all the data needed to create a new `image`
 * entity.
 */
@InputType()
export class CreateImageInput implements IImage {
  /**
   * Test
   *
   * @inheritdoc
   */
  @Field({
    nullable: false,
  })
  @IsDefined({ message: 'It is required to send the url' })
  @IsUrl({}, { message: 'It is required to send a valid url' })
  @IsString({ message: 'It is required to send a valid string' })
  url: string

  /**
   * @inheritdoc
   */
  @Field({
    nullable: true,
  })
  @IsDefined({ message: 'It is required to send the title' })
  @IsString({ message: 'It is required to send a valid string' })
  title: string
}
