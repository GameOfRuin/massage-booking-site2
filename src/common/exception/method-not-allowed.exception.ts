import { HttpStatus } from '@nestjs/common'

import { CommonException, AppErrorType } from '.'
import { IAppException } from './interfaces'

/**
 * HTTP 405: метод не разрешен.
 */
export class AppMethodNotAllowedException extends CommonException {
  status = HttpStatus.METHOD_NOT_ALLOWED
  type = AppErrorType.METHOD_NOT_ALLOWED

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
