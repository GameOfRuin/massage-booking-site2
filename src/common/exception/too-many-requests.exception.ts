import { HttpStatus } from '@nestjs/common'

import { IAppException, CommonException, AppErrorType } from '.'

/**
 * HTTP 429: превышено количество запросов.
 */
export class AppTooManyRequestsException extends CommonException {
  status = HttpStatus.TOO_MANY_REQUESTS
  type = AppErrorType.TOO_MANY_REQUESTS

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
