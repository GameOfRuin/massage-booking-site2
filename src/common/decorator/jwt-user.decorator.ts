import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AppForbiddenException } from '@common/exception'

/** 
 * Декоратор для получения данных пользователя из JWT
 */
export const JWTUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()

  if (!req.session.user) {
    throw new AppForbiddenException('Отсутствуют данные пользователя')
  }

  return data ? req.session.user[data] : req.session.user
})
