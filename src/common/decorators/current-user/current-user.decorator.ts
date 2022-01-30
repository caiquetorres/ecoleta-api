import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

/**
 * Decorator that marks a method parameter to receive an object that
 * represents the user which is trying to execute some action.
 */
export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context)
    return gqlContext.getContext().req.user
  },
)
