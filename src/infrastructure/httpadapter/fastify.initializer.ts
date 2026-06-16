import { AbstractHttpAdapter } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { fastifyRequestContext } from '@fastify/request-context'
import * as qs from 'qs'

/** Инициализатор Fastify */
export class FastifyInitializer {
  /** Фабрика инициализатора Fastify */
  public static factory(): AbstractHttpAdapter {
    return new FastifyAdapter({
      logger: true,
      querystringParser: str => qs.parse(str),
      trustProxy: true
    })
  }

  /** Регистрация Fastify */
  public static async register(app: NestFastifyApplication) {
    await app.register(fastifyRequestContext, {
      defaultStoreValues: {
        user: { id: 'system' }
      }
    })
  }
}
