import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class ErrorNotFoundFilter<T> implements GqlExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host);

    return new NotFoundException('Enitity Not found ');
  }
}
