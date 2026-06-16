import { applyDecorators } from '@nestjs/common'
import { Entity, EntityOptions } from 'typeorm'

/** 
 * Декоратор для создания кастомных entity
 */
export function CustomEntity(name?: string, options?: EntityOptions) {
  return applyDecorators(Entity(name, {
    ...options,
    synchronize: false
  }))
}
