import { LoggerService } from '@nestjs/common'
import { loggerMessage } from '@infrastructure/logger'

/**
 * Логгер приложения
 */
export class AppLogger implements LoggerService {
  private logAlwaysTrace = [ 'NestFactory', 'NestApplication' ]

  /** 
   * Логирование сообщения
   */
  log(message: any, trace: string) {
    if (process.env.APP_LOG_LEVEL === 'debug' || this.logAlwaysTrace.includes(trace)) {
      loggerMessage(false, {
        message
      })
    }
  }

  /** 
   * Логирование предупреждения
   */
  // eslint-disable-next-line sonarjs/no-identical-functions
  warn(message: any, trace: string) {
    loggerMessage(false, {
      message
    })
  }

  /** 
   * Логирование ошибки
   */
  error(err: Error, trace: string) {
    loggerMessage(true, {
      message: {
        message: err.message,
        trace
      }
    })
  }

  /** 
   * Логирование отладочного сообщения
   */
  // eslint-disable-next-line sonarjs/no-identical-functions
  debug(message: any, trace: string) {
    loggerMessage(false, {
      message
    })
  }

  /** 
   * Логирование подробного сообщения
   */
  // eslint-disable-next-line sonarjs/no-identical-functions
  verbose(message: string, trace: string) {
    loggerMessage(false, {
      message
    })
  }
}
