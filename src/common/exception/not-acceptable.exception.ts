import { HttpStatus } from '@nestjs/common'

import { IAppException, CommonException, AppErrorType } from '.'

/**
 * HTTP 406: неприемлемый запрос.
 */
export class AppNotAcceptableException extends CommonException {
  status = HttpStatus.NOT_ACCEPTABLE
  type = AppErrorType.NOT_ACCEPTABLE

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
