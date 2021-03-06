import { IImage } from '../../image/interfaces/image.interface'

/**
 * Interface that handles all the `item` entity properties.
 */
export interface IItem {
  /**
   * Property that defines a `string` that represents the `item`
   * name.
   */
  name: string

  /**
   * Property that defines a `string` that represents the related
   * `image` id.
   */
  imageId: string

  /**
   * Property that defines an `object` that contains all the data
   * related with the `item` image.
   */
  image: IImage
}
