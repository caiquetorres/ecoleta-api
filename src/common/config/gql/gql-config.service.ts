import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'

import { EnvService } from '../../../env/env.service'

import { join } from 'path'

/**
 * Service that is responsible for creating the `GraphQL` configuration
 * object.
 *
 * @usageNotes
 * It must be assigned to `useClass` property inside the `GraphQLModule`
 * factory options.
 */
@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly envService: EnvService) {}

  /**
   * Method that creates a new options object for the application
   * graphql.
   *
   * @returns an object with all the graphql module configurations.
   */
  createGqlOptions(): GqlModuleOptions {
    return {
      debug: this.envService.get('GQL_DEBUG'),
      playground: this.envService.get('GQL_PLAYGROUND'),
      sortSchema: this.envService.get('GQL_SORT_SCHEMA'),
      autoSchemaFile: join(
        process.cwd(),
        this.envService.get('GQL_AUTO_SCHEMA_FILE'),
      ),
      definitions: {
        path: join(process.cwd(), this.envService.get('GQL_DEFINITIONS_PATH')),
        outputAs: this.envService.get('GQL_DEFINITIONS_OUTPUT_AS'),
      },
      context: ({ req, connection }) =>
        connection ? { req: connection.context } : { req },
    }
  }
}
