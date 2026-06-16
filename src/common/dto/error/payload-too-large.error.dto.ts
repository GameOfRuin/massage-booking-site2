import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { AppErrorType, HttpStatusToMessage } from '@common/exception'

import { IAppErrorDTO, CommonErrorDTO } from './'

/** ДТО ошибки Payload Too Large */
export class PayloadTooLargeErrorDTO extends CommonErrorDTO implements IAppErrorDTO {
  /** Тип ошибки */
  @ApiProperty({
    example: AppErrorType.PAYLOAD_TOO_LARGE
  })
    type: AppErrorType

  /** Сообщение об ошибке */
  @ApiProperty({
    example: HttpStatusToMessage(HttpStatus.PAYLOAD_TOO_LARGE)
  })
    error: string | { [key: string]: any } | Error
}
