import { Args, Query, Resolver } from '@nestjs/graphql'

import { CityModel } from './dtos/city.model'
import { CountryModel } from './dtos/country.model'
import { StateModel } from './dtos/state.model'

import { LocationService } from './location.service'

/**
 * Resolver that deals with all the `queries` related with
 * locations.
 */
@Resolver(() => CountryModel)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  /**
   * Query that finds one `country` based on it `ISO2`.
   *
   * @param iso2 defines the `country` `ISO2` code
   * @returns an object that contains all the `country` data.
   */
  @Query(() => CountryModel, {
    name: 'country',
  })
  getOneCountry(
    @Args('iso2', { nullable: false })
    iso2: string,
  ) {
    return this.locationService.getOneCountry(iso2)
  }

  /**
   * Query that finds all the registered countries.
   *
   * @returns an array with all the found countries.
   */
  @Query(() => [CountryModel], {
    name: 'countries',
  })
  getManyCoutries() {
    return this.locationService.getManyCountries()
  }

  /**
   * Query that finds one `state` based on it `ISO2`.
   *
   * @param iso2 defines the `state` `ISO2` code
   * @returns an object that contains all the `state` data.
   */
  @Query(() => StateModel, {
    name: 'state',
  })
  getOneState(
    @Args('iso2', { nullable: false })
    iso2: string,
    @Args('countryIso2', { nullable: false })
    countryIso2: string,
  ) {
    return this.locationService.getOneState(iso2, countryIso2)
  }

  /**
   * Query that finds all the registered states.
   *
   * @returns an array with all the found states.
   */
  @Query(() => [StateModel], {
    name: 'states',
  })
  getManyStates(
    @Args('countryIso2', { nullable: false })
    countryIso2: string,
  ) {
    return this.locationService.getManyStates(countryIso2)
  }

  /**
   * Query that finds all the registered cities.
   *
   * @returns an array with all the found cities.
   */
  @Query(() => [CityModel], {
    name: 'cities',
  })
  getManyCities(
    @Args('stateIso2', { nullable: false })
    stateIso2: string,
    @Args('countryIso2', { nullable: false })
    countryIso2: string,
  ) {
    return this.locationService.getManyCities(stateIso2, countryIso2)
  }
}
