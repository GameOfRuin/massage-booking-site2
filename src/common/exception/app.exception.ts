import { HttpException, HttpStatus } from '@nestjs/common'

import { AppErrorType } from './constants'

/**
 * HTTP 400 — общая ошибка приложения (Bad Request).
 */
export class AppException extends HttpException {
  error: string | object | any
  type = AppErrorType.COMMON

  constructor(error?: string | object | any) {
    super('Application error', HttpStatus.BAD_REQUEST)
    this.message = error
    this.error = error
  }
}
