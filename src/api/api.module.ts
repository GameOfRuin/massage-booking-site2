import { APP_INTERCEPTOR } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { DataBaseModule } from '@infrastructure/database/database.module'
import { ResponseInterceptor } from '@common/interceptor'

@Module({
  imports: [ DataBaseModule ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ],
  exports: []
})
export class ApiModule {}
