import 'dotenv/config'
import { ILoggerMessage, ILoggerMessageOptions } from '@infrastructure/logger'
import { LogLevelEnum } from '@common/constants'

const blacklist =
  process.env.APP_LOG_BLACKLIST?.
    split(',')
    .map(el => el.trim()) || [ 'password', 'token' ]

/** 
 * Логирование в консоль сообщения
 */
export const loggerMessage = (error: boolean, options: ILoggerMessageOptions) => {
  const blacklistReplacer = (key: string, value: any) => blacklist.includes(key) ? '***' : value

  const {
    message,
    debug_payload,
    request_id,
    path,
    request,
    ip,
    method,
    status,
    duration,
    handler,
    stack
  } = options

  const log: ILoggerMessage = {
    level: error ? LogLevelEnum.ERROR : LogLevelEnum.SUCCESS,
    'x-request-id': request_id,
    app: process.env.APP_NAME,
    time: getDateUTC(),
    ip,
    method,
    path: path ? path.replace(new RegExp(`(${blacklist.join('|')})` + '=[\\w.\\-]+', 'gi'), '$1=***') : path,
    status,
    request,
    handler,
    stack,
    duration,
    debug_payload
  }

  if (error) {
    Object.assign(log, { error: message })
  } else {
    Object.assign(log, { message })
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(log, blacklistReplacer))
  } else {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(log, blacklistReplacer))
  }
}

/** 
 * Получение даты в UTC
 */
function getDateUTC() {
  const d = new Date()

  return d.toISOString()
}
