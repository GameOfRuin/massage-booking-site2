import { HttpStatus } from '@nestjs/common'

import { IAppException, CommonException, AppErrorType } from '.'

/**
 * HTTP 401: неавторизованный запрос.
 */
export class AppUnauthorizedException extends CommonException {
  status = HttpStatus.UNAUTHORIZED
  type = AppErrorType.UNAUTHORIZED

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
