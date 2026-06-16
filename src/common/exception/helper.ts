import { HttpStatus } from '@nestjs/common'

/**
 * Преобразование HTTP статуса в сообщение.
 */
export const HttpStatusToMessage = (status: HttpStatus): string => {
  return HttpStatus[status].toLowerCase()
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase())
}
