import { AppErrorType } from '@common/exception'

/** Интерфейс ошибки */
export interface IAppErrorDTO {
  /** Тип ошибки */
  type: AppErrorType
  /** Время ошибки */
  timestamp: string
  /** Метод запроса */
  method?: string
  /** Путь запроса */
  path: string
  /** ID запроса */
  'x-request-id': string
  /** Сообщение об ошибке */
  error: string | { [key: string]: any } | Error
  /** Debug */
  debug?: string | { [key: string]: any } | Error
}

