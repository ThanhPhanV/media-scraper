import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorResponse } from 'src/common/interface/app-response.interface';
import { LoggerService } from 'src/modules/logger/logger.service';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerService: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const request = ctx.getRequest();

    const responseBody: ErrorResponse = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
      status: httpStatus,
      timestamp: new Date().toISOString(),
    };

    this.loggerService.log({
      url: request.url,
      method: request.method,
      status: httpStatus,
      message: exception instanceof Error ? exception.message : 'Unknown error',
      body: JSON.stringify(request.body || ''),
      res: JSON.stringify(responseBody || ''),
    });

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
