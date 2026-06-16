import { applyDecorators, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'
import {
  InternalServerErrorDTO,
  DatabaseErrorDTO,
  ClassValidatorErrorDTO,
  BadRequestErrorDTO,
  ForbiddenErrorDTO,
  NotFoundErrorDTO,
  UnauthorizedErrorDTO
} from '@common/dto'

/** 
 * Декоратор для общих API ответов
 */
export function ApiCommonDecorator(tag: string) {
  return applyDecorators(
    ApiTags(tag),
    ApiInternalServerErrorResponse({
      type: InternalServerErrorDTO,
      description: 'Internal Server Error'
    }),
    ApiUnauthorizedResponse({
      type: UnauthorizedErrorDTO,
      description: 'Unauthorized'
    }),
    ApiForbiddenResponse({
      type: ForbiddenErrorDTO,
      description: 'Forbidden'
    }),
    ApiNotFoundResponse({
      type: NotFoundErrorDTO,
      description: 'Not Found'
    }),
    ApiBadRequestResponse({
      type: BadRequestErrorDTO,
      description: 'Bad request'
    }),
    ApiNotAcceptableResponse({
      type: ClassValidatorErrorDTO,
      description: 'Payload validation error'
    }),
    ApiUnprocessableEntityResponse({
      type: DatabaseErrorDTO,
      description: 'Database error'
    })
  )
}

/** 
 * Декоратор для общих API ответов с guard
 */
export function ApiCommonGuardDecorator(tag: string, guard: any) {
  return applyDecorators(
    ApiCommonDecorator(tag),
    ApiBearerAuth('JWT'),
    UseGuards(guard)
  )
}
