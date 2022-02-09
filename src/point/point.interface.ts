import { IImage } from '../image/image.interface'
import { IAddress } from './address.interface'

/**
 * Interface that handles all the `point` entity properties.
 */
export interface IPoint {
  /**
   * Property that defines a `string` that represents the `point` name.
   */
  name: string

  /**
   * Property that defines a `string` that represents the `point`
   * description.
   */
  description: string

  /**
   * Property that defines a `string` that represents the point
   * `whatsapp` number.
   */
  whatsapp: string

  /**
   * Property that defines a `string` that represents the point
   * `email` address.
   */
  email: string

  /**
   * Property that defines a `string` that represents the related
   * `image` entity id.
   */
  imageId: string

  /**
   * Property that defines a `string` that represents the related
   * `address` entity id.
   */
  addressId: string

  /**
   * Property that defines an object that contains all the related
   * image entity.
   */
  image: IImage

  /**
   * Property that defines an object that contains all the related
   * address entity.
   */
  address: IAddress
}
