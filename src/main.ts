import 'dotenv/config'
// import { raw } from 'body-parser'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import * as Sentry from '@sentry/node'
import { types as pgTypes } from 'pg'
import { useContainer } from 'class-validator'
import { ExpressInitializer } from '@infrastructure/httpadapter/express.initializer'
import { SwaggerInit } from '@infrastructure/swagger'
import { AppLogger } from '@infrastructure/logger'
import { ClassValidatorExceptionFactory } from '@common/exception'
import { NodeEnv } from '@infrastructure/environment'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { AppExceptionsFilter } from '@common/filter/app.exception.filter'

import { AppModule } from './app.module'

/*

 FIX for numeric pg type
 https://github.com/brianc/node-postgres/issues/811

*/
pgTypes.setTypeParser(pgTypes.builtins.NUMERIC, value => parseFloat(value))

// CORS
const allowCorsDomain =
  process.env.APP_ALLOW_CORS_ORIGIN_DOMAIN?.trim()
    .split(',')
    .map(domain => domain.trim())
    .filter(domain => domain != '')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    ExpressInitializer.factory(),
    {
      logger: new AppLogger(),
      rawBody: true,
      cors: {
        preflightContinue: false,
        credentials: true,
        origin: (origin, callback) => {
          let allowOrigin = null

          if (origin) {
            if (process.env.NODE_ENV !== NodeEnv.PRODUCTION) {
              // eslint-disable-next-line sonarjs/no-gratuitous-expressions
              allowOrigin = origin || '*'
            } else {
              const requestOrigin = new URL(origin)

              allowOrigin = requestOrigin.hostname && (allowCorsDomain.includes(requestOrigin.hostname) || process.env.APP_ALLOW_CORS_ORIGIN_DOMAIN?.trim() === '*') ? origin : null
            }
          }

          callback.call(
            this,
            null,
            allowOrigin
          )
        }
      }
    }
  )

  // app.setGlobalPrefix('api', {
  //   exclude: [
  //     {
  //       path: 'health',
  //       method: RequestMethod.GET
  //     }
  //   ]
  // })

  await SwaggerInit.register(app)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: ClassValidatorExceptionFactory
  }))

  // https://github.com/nestjs/nest/issues/528
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const configService = app.get(ConfigService) as ConfigService

  const sentryDns = configService.get<string>('APP_SENTRY_DNS')

  if (sentryDns) {
    Sentry.init({
      dsn: sentryDns
    })
    // const { httpAdapter } = app.get(HttpAdapterHost)
    // app.useGlobalFilters(new SentryFilter(httpAdapter))
  }

  app.useGlobalFilters(new AppExceptionsFilter(configService))

  const host = configService.get<string>('APP_HOST') || '0.0.0.0'
  const port = configService.get<number>('APP_PORT') || 80

  // app.useGlobalFilters(new CommonExceptionFilter(configService, app.get(DevLogger)))

  // Starts listening for shutdown hooks
  app.enableShutdownHooks()

  if (configService.get<string>('NODE_ENV') !== NodeEnv.PRODUCTION) {
    if (existsSync(join(__dirname, '..', 'public'))) {
      app.useStaticAssets(join(__dirname, '..', 'public'))
    } else if (existsSync(join(__dirname, 'public'))) {
      app.useStaticAssets(join(__dirname, 'public'))
    }
  }

  await app.listen(port, host)
}

bootstrap()
