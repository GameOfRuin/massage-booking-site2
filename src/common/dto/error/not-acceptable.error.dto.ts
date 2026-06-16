import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { AppErrorType, HttpStatusToMessage } from '@common/exception'

import { IAppErrorDTO, CommonErrorDTO } from './'

/** ДТО ошибки Not Acceptable */
export class NotAcceptableErrorDTO extends CommonErrorDTO implements IAppErrorDTO {
  /** Тип ошибки */
  @ApiProperty({
    example: AppErrorType.NOT_ACCEPTABLE
  })
    type: AppErrorType

  /** Сообщение об ошибке */
  @ApiProperty({
    example: HttpStatusToMessage(HttpStatus.NOT_ACCEPTABLE)
  })
    error: string | { [key: string]: any } | Error
}
