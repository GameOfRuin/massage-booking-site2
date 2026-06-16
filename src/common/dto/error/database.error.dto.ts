import { ApiProperty } from '@nestjs/swagger'
import { AppErrorType } from '@common/exception'

import { IAppErrorDTO, CommonErrorDTO } from './'

/** ДТО ошибки базы данных
 * */
export class DatabaseErrorDTO extends CommonErrorDTO implements IAppErrorDTO {
  /** Тип ошибки */
  @ApiProperty({
    example: AppErrorType.DATABASE
  })
    type: AppErrorType

  /** Сообщение об ошибке */
  @ApiProperty({
    example: 'Database error'
  })
    error: string | object | any

  /** Debug */
  @ApiProperty({
    example: {
      query: 'sеlect bar from foo',
      message: 'Entity public.foo does not exists'
    }
  })
    debug: string | object | any
}
