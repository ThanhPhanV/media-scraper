import { HttpException } from '@nestjs/common';
import { AppError } from '../error/app-error';

export interface ISystemExceptionMes {
  message?: string;
  detail?: string;
}

export class SystemException extends HttpException {
  constructor(code: string, mes?: ISystemExceptionMes) {
    const error = AppError.getError(code);
    super(
      {
        status: error.status,
        code,
        message: error.message,
        ...mes,
      },
      error.status,
    );
  }
}
