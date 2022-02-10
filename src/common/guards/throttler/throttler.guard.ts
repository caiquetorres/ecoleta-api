import { Injectable, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ThrottlerGuard as NestThrottlerGuard } from '@nestjs/throttler'

/**
 * Guard responsible for protecting some `query` or `mutation` of being called several times.
 */
@Injectable()
export class ThrottlerGuard extends NestThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context)
    const ctx = gqlCtx.getContext()
    return { req: ctx.req, res: ctx.res }
  }
}
