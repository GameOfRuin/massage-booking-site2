import 'dotenv/config'
import { join } from 'node:path'
import { DataSource } from 'typeorm'

/** Источник данных для TypeORM */
export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.APP_DB_HOST,
  port: Number(process.env.APP_DB_PORT),
  username: process.env.APP_DB_USER,
  password: process.env.APP_DB_PASSWORD,
  database: process.env.APP_DB_NAME,
  schema: process.env.APP_DB_SCHEMA ?? 'public',
  applicationName: process.env.APP_NAME ?? 'NestJsApp',
  ssl: process.env.APP_DB_SSL ? { ca: process.env.APP_DB_SSL } : false,
  parseInt8: false,
  logging: [ 'error' ],
  synchronize: false,
  connectTimeoutMS: 15000,
  entities: [
    // common backend entity folder
    join(__dirname, '../../../node_modules/@platforma-backend/avtomat-common/**/*.entity{.ts,.js}'),
    // local entity folder
    join(__dirname, '../../**/*.entity{.ts,.js}')
  ],
  migrations: [ join(__dirname, '../../migrations/*{.ts,.js}') ],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: true,
  migrationsTransactionMode: 'each'
})
