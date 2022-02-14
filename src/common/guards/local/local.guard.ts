import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

import { Request } from 'express'

/**
 * Guard that is responsible for validating the username and the
 * password before the user can perform any action.
 */
@Injectable()
export class LocalGuard extends AuthGuard('local') {
  /**
   * Method that returns the request from the context.
   *
   * @param context defines which context the application is running
   * into.
   * @returns an object that represents the request.
   */
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context)
    const { req } = gqlContext.getContext<{ req: Request }>()
    req.body = gqlContext.getArgs().input
    return req
  }
}
