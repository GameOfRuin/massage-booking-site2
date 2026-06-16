import { HttpStatus } from '@nestjs/common'

import { IAppException, CommonException, AppErrorType } from '.'

/**
 * HTTP 403: запрещенный запрос.
 */
export class AppForbiddenException extends CommonException {
  status = HttpStatus.FORBIDDEN
  type = AppErrorType.FORBIDDEN

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
