import { Injectable } from '@nestjs/common'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

import { EnvService } from '../../../env/env.service'

/**
 * Service that is responsible for creating the `Jwt` configuration
 * object.
 *
 * @usageNotes
 * It must be assigned to `useClass` property inside the `JwtModule`
 * factory options.
 */
@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new configuration for jwt.
   *
   * @returns an object with all the jwt module configurations.
   */
  createJwtOptions(): JwtModuleOptions {
    return {
      privateKey: this.envService.get('JWT_SECRET'),
    }
  }
}
