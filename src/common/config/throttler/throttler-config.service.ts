import { Injectable } from '@nestjs/common'
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler'

import { EnvService } from '../../../env/env.service'

/**
 * Service that is responsible for creating the `Throttler` configuration object.
 *
 * @usageNotes
 * It must be assigned to `useClass` property inside the `ThrottlerModule` factory options.
 */
@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new options object for the application `throttler` module.
   *
   * @returns an object that contains all the `throttler` module options.
   */
  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ttl: this.envService.get('THROTTLER_TTL'),
      limit: this.envService.get('THROTTLER_LIMIT'),
    }
  }
}
