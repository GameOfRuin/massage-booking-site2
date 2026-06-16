import { LogLevelEnum } from '@common/constants'

/** Интерфейс опций логирования */
export interface ILoggerMessageOptions {
  /** Сообщение */
  message?: any
  /** Путь */
  path?: string
  /** Статус */
  status?: number
  /** ID запроса */
  request_id?: string
  /** Запрос */
  request?: any
  /** IP адрес */
  ip?: string
  /** Метод */
  method?: string
  /** Длительность */
  duration?: number
  /** Отладочная информация */
  debug_payload?: any
  /** Обработчик */
  handler?: string
  /** Стек */
  stack?: string
}

/** Интерфейс сообщения логирования */
export interface ILoggerMessage extends ILoggerMessageOptions {
  /** Уровень логирования */
  level: LogLevelEnum
  /** ID запроса */
  'x-request-id'?: string
  /** Название приложения */
  app?: string
  /** Время */
  time?: string
}
