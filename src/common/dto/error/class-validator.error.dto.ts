import { ApiProperty } from '@nestjs/swagger'
import { AppErrorType } from '@common/exception'

import { IAppErrorDTO, CommonErrorDTO } from './'

/** ДТО ошибки Class Validator */
export class ClassValidatorErrorDTO extends CommonErrorDTO implements IAppErrorDTO {
  /** Тип ошибки */
  @ApiProperty({
    example: AppErrorType.VALIDATOR
  })
    type: AppErrorType

  /** Сообщение об ошибке */
  @ApiProperty({
    example: [
      {
        target: {
          foo: 'bar'
        },
        value: 'bar',
        property: 'foo',
        children: [],
        constraints: {
          validatorName: 'foo must be a valid'
        }
      }
    ]
  })
    error: string | { [key: string]: any } | Error
}
