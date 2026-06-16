import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
  HealthIndicatorFunction,
  MicroserviceHealthIndicator
} from '@nestjs/terminus'
import { AppHealthCheckException } from '@platforma-backend/avtomat-common/exception'
import { RmqOptions, Transport } from '@nestjs/microservices'
import { RmqQueueEnum, RmqUrls } from '@platforma-backend/avtomat-common/constants'

import { RedisHealthIndicator } from './indicator/redis'

@ApiTags('System')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly config: ConfigService,
    private microservice: MicroserviceHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private redisHealthIndicator: RedisHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    operationId: 'healthCheck',
    summary: 'Health check'
  })
  check() {
    const modules: HealthIndicatorFunction[] = []

    modules.push(() => this.db.pingCheck('postgresql'))
    modules.push(() => this.redisHealthIndicator.isHealthy('redis'))

    if (this.config.get<string>('APP_RMQ_URL')) {
      modules.push(() => this.microservice.pingCheck<RmqOptions>('rabbitmq', {
        transport: Transport.RMQ,
        options: {
          urls: RmqUrls,
          queue: RmqQueueEnum.HEALTH_CHECK,
          queueOptions: {
            expires: 1
          }
        }
      }))
    }

    return this.health.check(modules).catch(e => {
      throw new AppHealthCheckException({ message: e.response })
    })
  }
}
