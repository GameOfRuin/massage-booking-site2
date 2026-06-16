import { join } from 'path'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmLogger } from '@infrastructure/logger'
import { DatabaseService } from '@infrastructure/database/database.service'

const modules = []
const providers = []

if (process.env.APP_DB_HOST) {
  modules.push(TypeOrmModule.forRootAsync({
    imports: [ ConfigModule ],
    inject: [ ConfigService ],
    useFactory: async (config: ConfigService) => ({
      type: 'postgres',
      host: config.get<string>('APP_DB_HOST'),
      port: config.get<number>('APP_DB_PORT'),
      username: config.get<string>('APP_DB_USER'),
      password: config.get<string>('APP_DB_PASSWORD'),
      database: config.get<string>('APP_DB_NAME'),
      schema: config.get<string>('APP_DB_SCHEMA') ?? 'public',
      applicationName: config.get<string>('APP_NAME') ?? 'NestJsApp',
      ssl: config.get<string>('APP_DB_SSL') ? { ca: config.get<string>('APP_DB_SSL') } : false,
      bigNumberStrings: false,
      logging: [ 'error' ],
      logger: new TypeOrmLogger(),
      maxQueryExecutionTime: 10000,
      synchronize: false,
      connectTimeoutMS: 30000,
      entities: [
        // common backend entity folder
        join(__dirname, '../../../node_modules/@platforma-backend/avtomat-common/**/*.entity{.ts,.js}'),
        // local entity folder
        join(__dirname, '../../**/*.entity{.ts,.js}')
      ]
    })
  }))

  providers.push(DatabaseService)
}

@Global()
@Module({
  imports: modules,
  providers,
  exports: providers
})

export class DataBaseModule {}
