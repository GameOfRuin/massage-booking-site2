/* eslint-disable no-console */
import { Logger } from 'typeorm'
import { QueryRunner } from 'typeorm/query-runner/QueryRunner'
import { loggerMessage } from '@infrastructure/logger'

/** 
 * Логгер TypeORM
 */
export class TypeOrmLogger implements Logger {
  /** 
   * Логирование запроса
   */
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (process.env.APP_LOG_LEVEL === 'debug') {
      loggerMessage(
        false,
        {
          message: 'TypeORM: query',
          debug_payload: {
            query,
            parameters
          }
        }
      )
    }
  }

  /** 
   * Логирование ошибки запроса
   */
  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    let message

    if (typeof error === 'string') {
      message = error
    } else if (error instanceof Error) {
      message = error.message
    }

    if (process.env.APP_LOG_LEVEL === 'debug') {
      loggerMessage(
        true,
        {
          message: `TypeORM error: ${message}`,
          debug_payload: {
            error,
            query,
            parameters
          }
        }
      )
    }
  }

  /** 
   * Логирование медленного запроса
   */
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    loggerMessage(
      false,
      {
        message: 'TypeORM: slow query',
        debug_payload: {
          time,
          query,
          parameters
        }
      }
    )
  }

  /** 
   * Логирование построения схемы
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    if (process.env.APP_LOG_LEVEL === 'debug') {
      loggerMessage(
        false,
        {
          message: 'TypeORM: schema build',
          debug_payload: {
            message
          }
        }
      )
    }
  }

  /** 
   * Логирование миграции
   */
  logMigration(message: string, queryRunner?: QueryRunner) {
    if (process.env.APP_LOG_LEVEL === 'debug') {
      loggerMessage(
        false,
        {
          message: 'TypeORM: migration',
          debug_payload: {
            message
          }
        }
      )
    }
  }

  /** 
   * Логирование
   */
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    if (process.env.APP_LOG_LEVEL === 'debug') {
      loggerMessage(
        false,
        {
          message: 'TypeORM: log',
          debug_payload: {
            message,
            level
          }
        }
      )
    }
  }
}
