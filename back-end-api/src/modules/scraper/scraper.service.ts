import { Injectable } from '@nestjs/common';
import { ScraperRepository } from './repository/scraper.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CreateScrapeDto } from './dto/create-scraper.dto';
import { ScraperQueueName } from './enum/scraper-queue-name.enum';
import { ScraperStorageQueueJob } from './enum/scraper-storage-queue.enum';
import { PuppeteerService } from './puppeteer.service';

@Injectable()
export class ScraperService {
  constructor(
    private readonly scraperRepository: ScraperRepository,
    @InjectQueue(ScraperQueueName.SCRAPER_STORAGE_QUEUE)
    private scraperStorageQueue: Queue,
    private readonly puppeteerService: PuppeteerService,
  ) {}

  async saveInitScrape(payload: CreateScrapeDto) {
    return this.scraperStorageQueue.add(
      ScraperStorageQueueJob.ADD_URL,
      payload,
    );
  }

  async processNow(payload: CreateScrapeDto) {
    return this.puppeteerService.scrape(payload.urls[0]);
  }
}
