import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import { Request } from 'express'

/**
 * Guard that is responsible for validating the token before the user
 * can perform any action.
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  /**
   * Method that returns the request from the context.
   *
   * @param context defines which context the application is running
   * into.
   * @returns an object that represents the request.
   */
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context)
    return gqlContext.getContext<{ req: Request }>().req
  }

  /**
   * Method that handles the request and deals with the user and error
   * data.
   *
   * @param error defines an object that represents the error
   * @param user defines an object that represents the logged user
   * @returns an object that represents the logged user
   */
  handleRequest<User>(error: Error, user: User) {
    if (error || !user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
