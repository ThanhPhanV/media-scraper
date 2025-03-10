import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerEntity } from './entity/logger.entity';
import { LoggerRepository } from './repository/logger.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LoggerEntity])],
  providers: [LoggerService, LoggerRepository],
})
export class LoggerModule {}
