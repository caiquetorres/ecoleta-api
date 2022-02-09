import { IPoint } from './point.interface'

/**
 * Interface that handles all the `address` entity properties.
 */
export interface IAddress {
  /**
   * Property that defines a `string` that represents the `address`
   * street.
   */
  street: string

  /**
   * Property that defines a `string` that represents the `address`
   * district.
   */
  district: string

  /**
   * Property that defines a `string` that represents the `address`
   * city.
   */
  city: string

  /**
   * Property that defines a `string` that represents the `address`
   * state.
   */
  state: string

  /**
   * Property that defines a `string` that represents the `address`
   * country.
   */
  country: string

  /**
   * Property that defines a `string` that represents the related
   * `point` entity id.
   */
  pointId: string

  /**
   * Property that defines an `object` that contains all the data
   * related with the `address` point.
   */
  point: IPoint
}
