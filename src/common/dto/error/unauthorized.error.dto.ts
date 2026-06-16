import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { AppErrorType, HttpStatusToMessage } from '@common/exception'

import { IAppErrorDTO, CommonErrorDTO } from './'

/** ДТО ошибки Unauthorized */
export class UnauthorizedErrorDTO extends CommonErrorDTO implements IAppErrorDTO {
  /** Тип ошибки */
  @ApiProperty({
    example: AppErrorType.UNAUTHORIZED
  })
    type: AppErrorType

  /** Сообщение об ошибке */
  @ApiProperty({
    example: HttpStatusToMessage(HttpStatus.UNAUTHORIZED)
  })
    error: string | { [key: string]: any } | Error
}
