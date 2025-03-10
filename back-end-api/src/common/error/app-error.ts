import { HttpStatus } from '@nestjs/common';

export interface IError {
  message: string;
  status: number;
  code?: string;
}

export class AppError {
  static errorMap = new AppError().initializeErrorMap();

  static USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS:400';
  static UNAUTHORIZED = 'UNAUTHORIZED:401';

  initializeErrorMap() {
    const errorMap = new Map<string, IError>();

    errorMap.set('USER_ALREADY_EXISTS:400', {
      message: 'User already exists',
      status: HttpStatus.BAD_REQUEST,
    });
    errorMap.set('UNAUTHORIZED:401', {
      message: 'User already exists',
      status: HttpStatus.UNAUTHORIZED,
    });

    return errorMap;
  }

  static getError(errorCode: string): IError {
    return AppError.errorMap.get(errorCode);
  }
}
