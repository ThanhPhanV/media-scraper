import { Injectable } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { LoggerRepository } from './repository/logger.repository';

@Injectable()
export class LoggerService {
  constructor(private readonly loggerRepo: LoggerRepository) {}
  async log(message: CreateLoggerDto) {
    return this.loggerRepo.save(message);
  }
}
