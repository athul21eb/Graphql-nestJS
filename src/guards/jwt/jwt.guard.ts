import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GqlJwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const GqlCtx = GqlExecutionContext.create(context);

    return GqlCtx.getContext().req;
  }
}
