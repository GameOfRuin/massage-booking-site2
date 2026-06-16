import { HttpStatus } from '@nestjs/common'

import { IAppException, CommonException, AppErrorType } from '.'

/**
 * HTTP 503: сервис недоступен.
 */
export class AppHealthCheckException extends CommonException implements IAppException {
  status = HttpStatus.SERVICE_UNAVAILABLE
  type = AppErrorType.HEALTHCHECK

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
