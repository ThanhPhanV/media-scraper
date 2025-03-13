import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticSearchService {
  private client: Client;
  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      node: this.configService.get('ES_URL'),
      auth: {
        apiKey: {
          id: this.configService.get('ES_API_KEY_ID'),
          api_key: this.configService.get('ES_API_KEY_SECRET'),
        },
      },
    });
  }
  async log<T>(message: T) {
    return this.client.index({
      index: this.configService.get('LOGGER_INDEX'),
      body: message,
    });
  }
}
