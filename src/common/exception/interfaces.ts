import { HttpStatus } from '@nestjs/common'

import { AppErrorType } from '.'

/**
 * Интерфейс для ошибок приложения..
 */
export interface IAppException {
  /** 
   * HTTP статус 
   * */
  status: HttpStatus
  /** 
   * Тип ошибки 
   * */
  type: AppErrorType
  /** Сообщение об ошибке */
  error?: string | object | any
  /** Код ошибки */
  code?: number | string
  /** Сообщение об ошибке */
  message?: string
  /** Данные ошибки */
  payload?: any
  /** Отладочные данные ошибки */
  debugPayload?: any
}
