import { ApiProperty } from '@nestjs/swagger'
import { IEntityBase } from '@common/interfaces/other/entity-base'

/** ДТО базовой сущности */
export class EntityBaseDTO<I> implements IEntityBase {
  constructor(data: Partial<I>, excludeKey?: string[]) {
    if (data) {
      for (const key of Object.keys(data)) {
        if (!excludeKey?.includes(key)) {
          this[key] = data[key]
        }
      }
    }
  }

  /** Дата создания */
  @ApiProperty({
    example: (new Date()).toISOString(),
    required: true
  })
    created_at?: Date

  /** Дата изменения */
  @ApiProperty({
    example: (new Date()).toISOString(),
    required: true
  })
    updated_at?: Date
}
