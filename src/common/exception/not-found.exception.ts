import { HttpStatus } from '@nestjs/common'

import { IAppException, CommonException, AppErrorType } from '.'

/**
 * HTTP 404: ресурс не найден.
 */
export class AppNotFoundException extends CommonException {
  status = HttpStatus.NOT_FOUND
  type = AppErrorType.NOT_FOUND

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
