import { ValidationError } from 'class-validator'
import { RpcException } from '@nestjs/microservices'

import { flatValidationErrors } from './flat-validation-errors'

/** 
 * Проверка ошибок валидации и выбрасывание исключения
 */
export function checkValidationErrors(errors: ValidationError | ValidationError[]): void {
  const errorArray = Array.isArray(errors) ? errors : [ errors ]

  if (errorArray.length === 0) {
    return
  }

  const allMessages = flatValidationErrors(errorArray)

  if (allMessages.length > 0) {
    throw new RpcException({ message: allMessages.join('; ') })
  }
}
