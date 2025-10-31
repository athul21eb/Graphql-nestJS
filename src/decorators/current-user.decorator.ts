
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const GqlContext = GqlExecutionContext.create(ctx)
 const user =GqlContext.getContext().req.user;

    if(data)return user[data]
    return user
  },
);
