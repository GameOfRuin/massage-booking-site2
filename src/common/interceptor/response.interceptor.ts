import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { loggerMessage } from '@infrastructure/logger'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    const res = context.switchToHttp().getResponse()
    const req = context.switchToHttp().getRequest()
    // const handler = `${context.getClass().name}.${context.getHandler().name}`

    return next.handle()
      .pipe(map(response => {
        res.statusCode = 200

        const headers = { ...req.headers }

        const xRequestId = req.headers['x-request-id']

        if (xRequestId) {
          headers['X-Request-Id'] = xRequestId
        }

        const ip = req.headers['x-real-ip'] || req.ip
        const method = res.req.method

        const time = (Date.now() - now) / 1000

        if (req.method === 'POST' && res.statusCode === 200) {
          res.statusCode = 201
        }

        loggerMessage(
          false,
          {
            message: this.config.get<string>('APP_LOG_LEVEL') === 'debug' ? response : undefined,
            path: req.headers['x-origin-uri'] || req.path,
            request_id: xRequestId,
            request: {
              body: JSON.stringify(req.body) !== '{}' ? req.body : undefined,
              query: JSON.stringify(req.query) !== '{}' ? req.query : undefined,
              params: JSON.stringify(req.params) !== '{}' ? req.params : undefined
            },
            ip,
            method,
            status: res.statusCode,
            // handler,
            duration: time
          }
        )

        return response
      }))
  }
}
