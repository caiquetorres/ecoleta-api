import { Query, Resolver } from '@nestjs/graphql'

/**
 * Resolver that deals with the api health checking.
 */
@Resolver(() => String)
export class AppResolver {
  /**
   * Method that, if called, returns a simple string.
   *
   * @returns a string that says if the api is working as exepected.
   */
  @Query(() => String, {
    name: 'ping',
    description: 'Used for testing the api connection',
  })
  ping() {
    return 'pong'
  }
}
