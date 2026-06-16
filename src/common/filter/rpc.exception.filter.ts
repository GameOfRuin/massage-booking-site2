import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { RpcException } from '@nestjs/microservices'
import { loggerMessage } from '@infrastructure/logger'

/** Фильтр ошибок RPC */
@Catch(RpcException)
export class RMQExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    loggerMessage(
      true,
      {
        message: exception.message,
        method: 'RPC',
        debug_payload: exception.getError(),
        stack: exception.stack
      }
    )

    return throwError(() => exception.getError())
  }
}
