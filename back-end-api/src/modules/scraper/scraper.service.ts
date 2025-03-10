import { Injectable } from '@nestjs/common';
import { ScraperRepository } from './repository/scraper.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CreateScrapeDto } from './dto/create-scraper.dto';
import { ScraperQueueName } from './enum/scraper-queue-name.enum';
import { ScraperStorageQueueJob } from './enum/scraper-storage-queue.enum';

@Injectable()
export class ScraperService {
  constructor(
    private readonly scraperRepository: ScraperRepository,
    @InjectQueue(ScraperQueueName.SCRAPER_STORAGE_QUEUE)
    private scraperStorageQueue: Queue,
  ) {}

  async saveInitScrape(payload: CreateScrapeDto) {
    return this.scraperStorageQueue.add(
      ScraperStorageQueueJob.ADD_URL,
      payload,
    );
  }
}
