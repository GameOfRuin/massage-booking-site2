import { HttpStatus } from '@nestjs/common'

import { AppErrorType, CommonException, IAppException } from '.'

/**
 * HTTP 406: неприемлемый запрос: неверный формат или типы данных.
 */
export class AppClassValidatorException extends CommonException {
  status = HttpStatus.NOT_ACCEPTABLE
  type = AppErrorType.VALIDATOR

  constructor(error: Partial<IAppException> = {}) {
    super(error as IAppException)
    this.message = error.message
  }
}
