import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/migration/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
