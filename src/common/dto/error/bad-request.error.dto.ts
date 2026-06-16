import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { AppErrorType, HttpStatusToMessage } from '@common/exception'

import { IAppErrorDTO, CommonErrorDTO } from './'

/** ДТО ошибки Bad Request */
export class BadRequestErrorDTO extends CommonErrorDTO implements IAppErrorDTO {
  /** Тип ошибки */
  @ApiProperty({
    example: AppErrorType.BAD_REQUEST
  })
    type: AppErrorType

  /** Сообщение об ошибке */
  @ApiProperty({
    example: HttpStatusToMessage(HttpStatus.BAD_REQUEST)
  })
    error: string | { [key: string]: any } | Error
}
