import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AppForbiddenException } from '@common/exception'

/** 
 * Декоратор для получения данных пользователя из сессии
 */
export const SessionUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()

  if (!req.session || !req.session?.user) {
    throw new AppForbiddenException('Отсутствуют данные сессии пользователя')
  }

  return data ? req.session?.user[data] : req.session?.user
})
