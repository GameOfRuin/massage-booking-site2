import { HttpStatus } from '@nestjs/common'

import { IAppException, CommonException, AppErrorType } from '.'

/**
 * HTTP 408: запрос превысил время ожидания.
 */
export class AppRequestTimeoutException extends CommonException {
  status = HttpStatus.REQUEST_TIMEOUT
  type = AppErrorType.REQUEST_TIMEOUT

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
