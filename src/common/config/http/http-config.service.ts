import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

import { EnvService } from '../../../env/env.service'

/**
 * Service that is responsible for creating the `Http` configuration object.
 *
 * @usageNotes
 * It must be assigned to `useClass` property inside the `HttpModule` factory options.
 */
@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new options object for the application `http` module.
   *
   * @returns an object that contains all the `http` module options.
   */
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: this.envService.get('HTTP_TIMEOUT'),
    }
  }
}
