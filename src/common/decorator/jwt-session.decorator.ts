import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AppForbiddenException } from '@common/exception'
/** 
 * Декоратор для получения данных сессии из JWT
 */
export const JWTSession = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()

  if (!req.session) {
    throw new AppForbiddenException('Отсутствуют данные сессии')
  }

  return req.session
})
