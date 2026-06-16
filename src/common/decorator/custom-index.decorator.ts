import { applyDecorators } from '@nestjs/common'
import { Index } from 'typeorm'
import { IndexOptions } from 'typeorm/decorator/options/IndexOptions'

/** 
 * Декоратор для создания custom index
 */
export function CustomIndex(name: string, fields: string[], options?: IndexOptions) {
  // return applyDecorators(Index(name, fields, options))
  return applyDecorators(Index(name, { synchronize: false }))
}
