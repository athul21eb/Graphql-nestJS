import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    
    if (!requiredRoles) {
      return true;
    }
    const { user } = GqlExecutionContext.create(context).getContext().req;

    console.log('user role =>', user.role);
    return requiredRoles.some((role) => user.role === role);
  }
}
