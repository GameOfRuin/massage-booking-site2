import { HttpStatus } from '@nestjs/common'

import { AppErrorType } from './constants'
import { HttpStatusToMessage } from './helper'
import { IAppException } from './interfaces'

/**
 * Базовое исключение для всех ошибок.
 */
export class CommonException extends Error implements IAppException {
  status = HttpStatus.INTERNAL_SERVER_ERROR
  type = AppErrorType.INTERNAL_SERVER_ERROR
  error?: string | object | any
  payload?: any
  debugPayload?: any
  message = HttpStatusToMessage(HttpStatus.INTERNAL_SERVER_ERROR)
  code: string | number

  constructor(input: string | Partial<IAppException>) {
    super()
    this.setProperties(input)
  }

  /**
   * Установка свойств ошибки.
   */
  setProperties(input: string | Partial<IAppException>) {
    if (typeof input === 'string') {
      this.message = input
    } else if (input && typeof input === 'object') {
      this.status = input.status || this.status
      this.type = input.type || this.type
      this.message = input.message || HttpStatusToMessage(this.status)
      this.error = input.error
      this.code = input.code
      this.payload = input.payload
      this.debugPayload = input.debugPayload
    }
  }

  // Builder pattern for example
  /**
   * Установка сообщения ошибки.
   */
  setMessage(message: string) {
    this.message = message

    return this
  }

  /**
   * Установка данных ошибки.
   *
   * @param payload Данные ошибки
   */
  setPayload(payload: any) {
    this.payload = payload

    return this
  }

  /**
   * Установка отладочных данных ошибки.
   */
  setDebugPayload(debugPayload: any) {
    this.debugPayload = debugPayload

    return this
  }
}
