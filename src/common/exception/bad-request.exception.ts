import { HttpStatus } from '@nestjs/common'

import { IAppException, CommonException, AppErrorType } from '.'

/**
   * HTTP 400 — некорректный запрос: неверная форма, типы или обязательные поля.
*/
export class AppBadRequestException extends CommonException {
  status = HttpStatus.BAD_REQUEST
  type = AppErrorType.BAD_REQUEST

  constructor(input: string | Partial<IAppException> = {}) {
    super(input)
    this.setProperties(input)
  }
}
