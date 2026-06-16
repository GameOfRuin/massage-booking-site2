import { HttpStatus } from '@nestjs/common'

import { AppErrorType, CommonException, IAppException } from '.'

/**
 * HTTP 422: ошибка базы данных.
 */
export class DatabaseException extends CommonException {
  status = HttpStatus.UNPROCESSABLE_ENTITY
  type = AppErrorType.DATABASE
  message = 'Database error'

  constructor(error: Partial<IAppException> = {}) {
    super(error as IAppException)

    this.message = error.message
  }
}
