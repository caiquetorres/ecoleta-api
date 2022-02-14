import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

import { CityModel } from './dtos/city.model'
import { CountryModel } from './dtos/country.model'
import { StateModel } from './dtos/state.model'

import { EnvService } from '../env/env.service'

import { ICity } from './interfaces/city.interface'
import { ICountry } from './interfaces/country.interface'
import { IState } from './interfaces/state.interface'
import { lastValueFrom, map } from 'rxjs'

/**
 * Service that deals with all the business logic related with
 * countries, states and cities.
 *
 * @see https://countrystatecity.in/
 */
@Injectable()
export class LocationService {
  /**
   * Property that defines the `CountryStateCity` url.
   */
  private readonly baseUrl: string

  /**
   * Property that defines an object that contains all the headers
   * that will sent to the `CountryStateCity`.
   */
  private readonly headers: Record<string, string | number | boolean>

  constructor(
    envService: EnvService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = envService.get('CSC_URL')
    this.headers = {
      'X-CSCAPI-KEY': envService.get('CSC_TOKEN'),
    }
  }

  /**
   * Method that finds one `country` based on it `ISO2`.
   *
   * @param iso2 defines the `country` `ISO2` code
   * @returns an object that contains all the `country` data.
   */
  getOneCountry(iso2: string) {
    return lastValueFrom<CountryModel>(
      this.httpService
        .get<ICountry>(`/countries/${iso2}`, {
          baseURL: this.baseUrl,
          headers: this.headers,
        })
        .pipe(map((response) => new CountryModel(response.data))),
    )
  }

  /**
   * Method that finds all the registered countries.
   *
   * @returns an array with all the found countries.
   */
  getManyCountries() {
    return lastValueFrom<CountryModel[]>(
      this.httpService
        .get<ICountry[]>('/countries', {
          baseURL: this.baseUrl,
          headers: this.headers,
        })
        .pipe(
          map((response) =>
            response.data.map((c: ICountry) => new CountryModel(c)),
          ),
        ),
    )
  }

  /**
   * Method that finds one `state` based on it `ISO2`.
   *
   * @param iso2 defines the `state` `ISO2` code
   * @returns an object that contains all the `state` data.
   */
  getOneState(iso2: string, countryIso2: string) {
    return lastValueFrom<StateModel>(
      this.httpService
        .get<IState>(`/countries/${countryIso2}/states/${iso2}`, {
          baseURL: this.baseUrl,
          headers: this.headers,
        })
        .pipe(map((response) => new StateModel(response.data))),
    )
  }

  /**
   * Method that finds all the registered states.
   *
   * @returns an array with all the found states.
   */
  getManyStates(countryIso2: string) {
    return lastValueFrom<StateModel[]>(
      this.httpService
        .get<IState[]>(`/countries/${countryIso2}/states`, {
          baseURL: this.baseUrl,
          headers: this.headers,
        })
        .pipe(map((response) => response.data.map((s) => new StateModel(s)))),
    )
  }

  /**
   * Method that finds all the registered cities.
   *
   * @returns an array with all the found cities.
   */
  getManyCities(stateIso2: string, countryIso2: string) {
    return lastValueFrom<CityModel[]>(
      this.httpService
        .get<ICity[]>(`/countries/${countryIso2}/states/${stateIso2}/cities`, {
          baseURL: this.baseUrl,
          headers: this.headers,
        })
        .pipe(
          map((response) => {
            return response.data.map((c) => new CityModel(c))
          }),
        ),
    )
  }
}
