import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // ⚠️ 只处理 HTTP 请求（防止 websocket / rpc 报错）
    if (!context.switchToHttp) {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    const { method, originalUrl, query, params, body } = req;
    const start = Date.now();

    console.log(
      `➡️ [REQ] ${method} ${originalUrl} | params=${JSON.stringify(
        params,
      )} | query=${JSON.stringify(query)} | body=${JSON.stringify(body)}`,
    );

    return next.handle().pipe(
      tap({
        next: (response) => {
          const cost = Date.now() - start;
          console.log(
            `⬅️ [RES] ${method} ${originalUrl} ${res.statusCode} | ${cost}ms | response=${JSON.stringify(response, null, 2)}`
          );
        },
        error: (error) => {
          const cost = Date.now() - start;
          console.error(
            `❌ [ERR] ${method} ${originalUrl} ${res.statusCode} | ${cost}ms | error=${JSON.stringify(error, null, 2)}`
          );
        },
      }),
    );
  }
}
