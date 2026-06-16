import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { AppErrorType, HttpStatusToMessage } from '@common/exception'

import { IAppErrorDTO, CommonErrorDTO } from './'

/** ДТО ошибки Forbidden */
export class ForbiddenErrorDTO extends CommonErrorDTO implements IAppErrorDTO {
  /** Тип ошибки */
  @ApiProperty({
    example: AppErrorType.FORBIDDEN
  })
    type: AppErrorType

  /** Сообщение об ошибке */
  @ApiProperty({
    example: HttpStatusToMessage(HttpStatus.FORBIDDEN)
  })
    error: string | { [key: string]: any } | Error
}
