import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvValidator } from '@common/class-validator'
import { ApiModule } from '@api/api.module'
import { InfrastructureModule } from '@infrastructure/infrastructure.module'

@Module({
  imports: [
    InfrastructureModule,
    ApiModule,
    ConfigModule.forRoot({
      validate: EnvValidator
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
