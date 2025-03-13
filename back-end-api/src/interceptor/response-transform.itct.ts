import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from 'src/modules/logger/logger.service';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly loggerService: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        this.loggerService.log({
          url: request.url,
          method: request.method,
          body: JSON.stringify(request.body || ''),
          status: response.statusCode,
          res: JSON.stringify(data || ''),
        });
        return { status: response.statusCode, data };
      }),
    );
  }
}
