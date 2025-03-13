import { Injectable } from '@nestjs/common';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { ElasticSearchService } from '../elasticsearch/elasticsearch.service';

@Injectable()
export class LoggerService {
  constructor(private readonly elasticSearch: ElasticSearchService) {}

  async log(message: CreateLoggerDto) {
    return this.elasticSearch.log<CreateLoggerDto>(message);
  }
}
