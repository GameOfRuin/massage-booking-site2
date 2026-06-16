import { Injectable } from '@nestjs/common'
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus'
import { IORedisClient } from '@infrastructure/redis'

/** Индикатор состояния Redis */
@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redis: IORedisClient) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.redis.ping()

      return this.getStatus(key, true)
    } catch (e) {
      throw new HealthCheckError(
        'RedisHealthIndicator failed',
        this.getStatus(key, false)
      )
    }
  }
}
