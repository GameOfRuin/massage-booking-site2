import { ApiProperty } from '@nestjs/swagger'
import { AppErrorType } from '@common/exception'

import { IAppErrorDTO } from './interfaces'

/** ДТО общей ошибки */
export class CommonErrorDTO implements IAppErrorDTO {
  /** Тип ошибки */
  @ApiProperty({
    example: AppErrorType.COMMON
  })
    type: AppErrorType

  /** Время ошибки */
  @ApiProperty({
    example: '2020-01-01T12:00:00.000Z'
  })
    timestamp: string

  /** Путь запроса */
  @ApiProperty({
    example: '/some/endpoint/path'
  })
    path: string

  /** ID запроса */
  @ApiProperty({
    example: 'request-id'
  })
    'x-request-id': string

  /** Сообщение об ошибке */
  @ApiProperty({
    example: 'Error'
  })
    error: string | { [key: string]: any } | Error
}
