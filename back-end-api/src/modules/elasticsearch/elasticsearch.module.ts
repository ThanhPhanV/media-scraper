import { Module } from '@nestjs/common';
import { ElasticSearchService } from './elasticsearch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ElasticSearchService],
  exports: [ElasticSearchService],
})
export class ElasticsearchModule {}
