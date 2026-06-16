/** Названия окружений */
export enum NodeEnv {
  /** Разработка */
  DEVELOPMENT = 'development',
  /** Производство */
  PRODUCTION = 'production',
  /** Тестирование */
  TEST = 'test'
}

/** Названия адаптеров HTTP */
export enum HttpAdapter {
  /** Express */
  EXPRESS = 'express',
  /** Fastify */
  FASTIFY = 'fastify'
}

/** Названия уровней логирования */
export enum LogLevel {
  /** Отладка */
  DEBUG = 'debug',
  /** Информация */
  INFO = 'info'
}
