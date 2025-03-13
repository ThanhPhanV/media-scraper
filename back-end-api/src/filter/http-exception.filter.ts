import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from 'src/common/interface/app-response.interface';
import { LoggerService } from 'src/modules/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.loggerService.log({
      url: request.url,
      method: request.method,
      status: status,
      message: exception.message,
      res: JSON.stringify(exception.getResponse() || ''),
    });

    const res: ErrorResponse = {
      ...(exception.getResponse() as {
        status: number;
        message: string;
        code: string;
      }),
      timestamp: new Date().toISOString(),
    };

    response.status(status).json({
      ...res,
    });
  }
}
