import { ApiProperty } from '@nestjs/swagger'
import { Validate, IsOptional, IsInt, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'
import { CrudGetManyRequest, MAX_GET_MANY_RESULT } from '@common/crud'

/** ДТО запроса получения множества записей */
export class CrudGetManyRequestDTO<T> implements CrudGetManyRequest<T> {
  /** Фильтры */
  @ApiProperty({
    example: { foo: 'bar' }
  })
  @IsOptional()
    search?: any

  /** Сортировка */
  @ApiProperty({
    example: 'order[0][0]=created_at&order[0][1]=desc'
  })
  @IsOptional()
  @Validate(
    async (input: [string, 'ASC' | 'DESC']): Promise<boolean> => {
      return (
        input.length === 2 && [ 'ASC', 'DESC' ].includes(input[1].toUpperCase())
      )
    },
    { each: true }
  )
    order?: [keyof T, 'ASC' | 'DESC'][]

  /** Количество выбираемых записей */
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
