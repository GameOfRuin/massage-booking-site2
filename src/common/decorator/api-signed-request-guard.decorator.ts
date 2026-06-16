import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiHeader } from '@nestjs/swagger'

import { ApiCommonDecorator } from './api-common.decorator'

/** 
 * Декоратор для API с guard и подписью
 */
export function ApiSignedRequestGuardDecorator(tag: string, guard: any) {
  return applyDecorators(
    ApiCommonDecorator(tag),
    UseGuards(guard),
    ApiHeader({
      name: 'signature',
      required: true,
      description: 'SHA256 подпись payload с солью'
    })
  )
}
