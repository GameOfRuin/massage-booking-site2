import { IsISO8601, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { FilterConditionEnum } from '@common/crud'

/** Фильтр по дате создания */
export class CreatedAtFilterDTO {
  /** Больше чем */
  @ApiProperty({
    example: '2025-11-01 00:00:00',
    required: false
  })
  @IsOptional()
  @IsISO8601()
  [ FilterConditionEnum.GREATER ]?: Date

  /** Больше или равно */
  @ApiProperty({
    example: '2025-11-01 00:00:00',
    required: false
  })
  @IsOptional()
  @IsISO8601()
  [ FilterConditionEnum.GREATER_OR_EQUAL ]?: Date

  /** Меньше чем */
  @ApiProperty({
    example: '2025-11-15 23:59:59',
    required: false
  })
  @IsOptional()
  @IsISO8601()
  [ FilterConditionEnum.LESS ]?: Date

  /** Меньше или равно */
  @ApiProperty({
    example: '2025-11-15 23:59:59',
    required: false
  })
  @IsOptional()
  @IsISO8601()
  [ FilterConditionEnum.LESS_OR_EQUAL ]?: Date
}
