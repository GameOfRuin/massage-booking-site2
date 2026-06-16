import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { ConfigModule } from '@nestjs/config'
import { SwaggerSection, SwaggerSectionEnum } from '@infrastructure/swagger'

import { HealthController } from './health.controller'
import { RedisHealthIndicator } from './indicator/redis'

@Module({
  imports: [
    TerminusModule,
    ConfigModule
  ],
  providers: [ RedisHealthIndicator ],
  controllers: [ HealthController ]
})
@SwaggerSection(SwaggerSectionEnum.HEALTH)
export class HealthModule {
}
