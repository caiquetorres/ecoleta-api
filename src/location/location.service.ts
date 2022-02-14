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

@Injectable()
export class LocationService {
  private readonly baseUrl: string
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
