import { HttpStatus } from '@nestjs/common'

import { IAppException, CommonException, AppErrorType } from '.'

/**
 * HTTP 422: запрос синтаксически верный, но сущность нельзя обработать
 */
export class AppUnprocessableEntityException extends CommonException {
  status = HttpStatus.UNPROCESSABLE_ENTITY
  type = AppErrorType.UNPROCESSABLE_ENTITY

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
