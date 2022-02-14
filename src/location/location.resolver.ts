import { Args, Query, Resolver } from '@nestjs/graphql'

import { CityModel } from './dtos/city.model'
import { CountryModel } from './dtos/country.model'
import { StateModel } from './dtos/state.model'

import { LocationService } from './location.service'

@Resolver(() => CountryModel)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(() => CountryModel, {
    name: 'country',
  })
  getOneCountry(
    @Args('iso2', { nullable: false })
    iso2: string,
  ) {
    return this.locationService.getOneCountry(iso2)
  }

  @Query(() => [CountryModel], {
    name: 'countries',
  })
  getManyCoutries() {
    return this.locationService.getManyCountries()
  }

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

  @Query(() => [StateModel], {
    name: 'states',
  })
  getManyStates(
    @Args('countryIso2', { nullable: false })
    countryIso2: string,
  ) {
    return this.locationService.getManyStates(countryIso2)
  }

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
