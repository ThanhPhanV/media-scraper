import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';

@Module({
  imports: [ElasticsearchModule],
  providers: [LoggerService],
  exports: [LoggerService],
  controllers: [],
})
export class LoggerModule {}
