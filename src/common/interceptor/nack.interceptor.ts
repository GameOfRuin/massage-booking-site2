import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

@Injectable()
export class NackInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(catchError(error => {
      return throwError(error)
    }))
  }
}
