import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { ScraperQueueName } from '../enum/scraper-queue-name.enum';
import { CreateScrapeDto } from '../dto/create-scraper.dto';
import { ScraperStorageQueueJob } from '../enum/scraper-storage-queue.enum';
import { ScraperRepository } from '../repository/scraper.repository';
import { Injectable } from '@nestjs/common';
import { ScraperProcessQueueJob } from '../enum/scraper-process-queue.enum';

@Processor(ScraperQueueName.SCRAPER_STORAGE_QUEUE)
@Injectable()
export class ScraperStorageConsumer extends WorkerHost {
  constructor(
    private readonly scraperRepository: ScraperRepository,
    @InjectQueue(ScraperQueueName.SCRAPER_PROCESSING_QUEUE)
    private scraperProcessingQueue: Queue,
  ) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case ScraperStorageQueueJob.ADD_URL:
        return this.saveInitScrape(job);
      default:
        return null;
    }
  }

  async saveInitScrape(job: Job<CreateScrapeDto>) {
    const payload = job.data;
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
