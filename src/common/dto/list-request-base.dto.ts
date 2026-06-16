import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, Max, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { ListRequest, MAX_GET_MANY_RESULT } from '@common/crud'

/** ДТО базового запроса списка */
export class ListRequestBaseDTO implements ListRequest<any, any> {
  /** Количество выбираемых записей, максимум */
  @ApiProperty({
    example: 10
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(MAX_GET_MANY_RESULT)
    limit?: number

  /** Количество пропускаемых записей */
  @ApiProperty({
    example: 0
  })
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @IsInt()
    offset?: number
}
