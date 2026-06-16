import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

/** ДТО успешного ответа */
export class SuccessResponseDTO {
  /** Сообщение об успехе */
  @ApiProperty()
    message: 'success'

  /** Флаг запуска */
  @ApiProperty({
    example: 'true',
    required: false,
    default: false
  })
  @IsBoolean()
    active: boolean
}

/** Константы ответов на запросы */
export const Responses = { SUCCESS: { message: 'success' } as SuccessResponseDTO }
