import { Injectable } from '@nestjs/common';
import { ScraperRepository } from './repository/scraper.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CreateScrapeDto } from './dto/create-scraper.dto';
import { ScraperQueueName } from './enum/scraper-queue-name.enum';
import { ScraperProcessQueueJob } from './enum/scraper-process-queue.enum';

@Injectable()
export class ScraperService {
  constructor(
    private readonly scraperRepository: ScraperRepository,
    @InjectQueue(ScraperQueueName.SCRAPER_PROCESSING_QUEUE)
    private scraperProcessingQueue: Queue,
  ) {}

  async saveInitScrape(payload: CreateScrapeDto) {
    const scrape = await this.scraperRepository.save(
      payload.urls.map((url) => ({ url })),
    );
    this.scraperProcessingQueue.addBulk(
      scrape.map((scrape) => ({
        name: ScraperProcessQueueJob.SCRAPER_START_PROCESS,
        data: { id: scrape.id },
      })),
    );
    return scrape;
  }
}
