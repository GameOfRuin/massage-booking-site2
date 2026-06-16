import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  MethodNotAllowedException,
  NotAcceptableException
} from '@nestjs/common'
import { QueryFailedError, TypeORMError, EntityNotFoundError } from 'typeorm'
import { loggerMessage } from '@infrastructure/logger'
import {
  AppErrorType,
  AppException,
  AppClassValidatorException,
  AppBadRequestException,
  AppUnauthorizedException,
  AppForbiddenException,
  AppNotFoundException,
  AppHealthCheckException,
  DatabaseException,
  AppNotAcceptableException,
  AppMethodNotAllowedException
} from '@common/exception'
import * as Sentry from '@sentry/node'
import { ConfigService } from '@nestjs/config'
import { NodeEnv } from '@infrastructure/environment'

/** Фильтр ошибок приложения */
@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  private isProduction = true

  constructor(configService: ConfigService) {
    this.isProduction = configService.get<string>('NODE_ENV') === NodeEnv.PRODUCTION
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()

    const res = ctx.getResponse()
    const req = ctx.getRequest()

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception.status || HttpStatus.INTERNAL_SERVER_ERROR

    const xRequestId = req.headers['x-request-id'] || 'request-id'

    let logMessage
    let responseMessage
    let type = exception.type || AppErrorType.COMMON
    let debug

    let debug_payload = exception.debugPayload

    switch (exception.constructor) {
      case AppException: {
        logMessage = exception.error
        responseMessage = logMessage
        break
      }

      case AppClassValidatorException: {
        logMessage = 'Validation error'
        responseMessage = exception.payload.errors

        break
      }

      case AppHealthCheckException: {
        logMessage = exception.message
        responseMessage = exception.message
        break
      }

      // list of expected exceptions
      case AppNotFoundException:
      case NotFoundException:
      case AppBadRequestException:
      case BadRequestException:
      case AppForbiddenException:
      case ForbiddenException:
      case AppUnauthorizedException:
      case UnauthorizedException:
      case AppMethodNotAllowedException:
      case MethodNotAllowedException:
      case AppNotAcceptableException:
      case NotAcceptableException: {
        type = exception.type || HttpStatus[status].toLowerCase()

        logMessage = exception.response?.message || exception.message

        if (Array.isArray(logMessage) && logMessage.length === 1) {
          [ logMessage ] = logMessage
        }

        responseMessage = exception.payload || logMessage

        break
      }
      case QueryFailedError:
      case TypeORMError:
      case EntityNotFoundError:
      case DatabaseException: {
        type = AppErrorType.DATABASE
        status = HttpStatus.UNPROCESSABLE_ENTITY

        logMessage = exception.error || exception.message
        responseMessage = exception.error || exception.message

        debug_payload = {
          query: exception.query,
          parameters: exception.parameters
        }

        break
      }
      default: {
        logMessage = exception.error || exception.message
        responseMessage = exception.error || exception.message
        break
      }
    }

    const ip = req.headers['x-real-ip'] || req.ip

    const response = {
      type: type || AppErrorType.COMMON,
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.url,
      'x-request-id': xRequestId,
      error: responseMessage,
      debug
    }

    loggerMessage(
      true,
      {
        message: logMessage,
        status,
        path: req.path,
        request_id: req.headers['x-request-id'],
        request: {
          body: JSON.stringify(req.body) !== '{}' ? req.body : undefined,
          query: JSON.stringify(req.query) !== '{}' ? req.query : undefined,
          params: JSON.stringify(req.params) !== '{}' ? req.params : undefined
        },
        ip,
        method: req.method,
        debug_payload,
        stack: status === HttpStatus.INTERNAL_SERVER_ERROR ? exception.stack : undefined
      }
    )

    if (process.env.APP_SENTRY_DNS) {
      Sentry.captureException(exception)
    }

    res.status(status).send(response)
  }
}
