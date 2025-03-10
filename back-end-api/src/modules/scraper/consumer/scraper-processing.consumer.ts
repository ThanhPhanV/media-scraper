import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { ScraperQueueName } from '../enum/scraper-queue-name.enum';
import { CreateScrapeDto } from '../dto/create-scraper.dto';
import { ScraperStorageQueueJob } from '../enum/scraper-storage-queue.enum';
import { ScraperRepository } from '../repository/scraper.repository';
import { Injectable } from '@nestjs/common';
import { ScraperProcessQueueJob } from '../enum/scraper-process-queue.enum';

@Processor(ScraperQueueName.SCRAPER_PROCESSING_QUEUE)
@Injectable()
export class ScraperProcessingConsumer extends WorkerHost {
  constructor(private readonly scraperRepository: ScraperRepository) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case ScraperProcessQueueJob.SCRAPER_START_PROCESS:
        return this.processScraper(job);
      default:
        return null;
    }
  }

  async processScraper(job: Job<any>) {
    const payload = job.data;
    console.log('Processing scraper', payload);
    return payload;
  }
}
