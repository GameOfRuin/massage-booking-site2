import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/** 
 * Декоратор для получения request id из заголовка
 */
export const XRequestId = createParamDecorator((data: string, ctx: ExecutionContext) => (ctx.switchToHttp().getRequest()).headers['x-request-id'])
