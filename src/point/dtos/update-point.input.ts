import { InputType } from '@nestjs/graphql'

import { IImage } from '../../image/image.interface'
import { IAddress } from '../address.interface'
import { IPoint } from '../point.interface'

@InputType()
export class UpdatePointInput implements Omit<IPoint, 'imageId' | 'addressId'> {
  /**
   * @inheritdoc
   */
  name: string

  /**
   * @inheritdoc
   */
  description: string

  /**
   * @inheritdoc
   */
  whatsapp: string

  /**
   * @inheritdoc
   */
  email: string

  /**
   * @inheritdoc
   */
  address: IAddress

  /**
   * @inheritdoc
   */
  image: IImage
}
