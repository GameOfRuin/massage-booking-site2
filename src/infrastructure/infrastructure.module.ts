import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DataBaseModule } from './database/database.module'
import { HealthModule } from './health/health.module'

const modules = [
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),
  HealthModule
]

if (process.env.APP_DB_HOST) {
  modules.push(DataBaseModule)
}

@Global()
@Module({
  imports: modules
})

export class InfrastructureModule {}
