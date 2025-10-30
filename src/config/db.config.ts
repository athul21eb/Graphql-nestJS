import { registerAs } from '@nestjs/config';
import { configDotenv } from 'dotenv';
import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

configDotenv();
export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [path.join(__dirname, '..', '**/*.entities.{ts,js}')],
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
);
