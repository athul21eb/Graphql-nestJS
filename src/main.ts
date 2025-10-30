import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorNotFoundFilter } from 'src/error-not-found/error-not-found.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorNotFoundFilter())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
