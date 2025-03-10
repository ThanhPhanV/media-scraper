import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { ScrapeProcessDto } from '../dto/scrap-process-payload.dto';
import { ScraperProcessQueueJob } from '../enum/scraper-process-queue.enum';
import { ScraperQueueName } from '../enum/scraper-queue-name.enum';
import { ScraperStatus } from '../enum/scraper-status.enum';
import { PuppeteerService } from '../puppeteer.service';
import { ScraperRepository } from '../repository/scraper.repository';
import { LoggerService } from '../../../modules/logger/logger.service';

@Processor(ScraperQueueName.SCRAPER_PROCESSING_QUEUE)
@Injectable()
export class ScraperProcessingConsumer extends WorkerHost {
  constructor(
    private readonly scraperRepository: ScraperRepository,
    private readonly puppeteerService: PuppeteerService,
    private readonly loggerService: LoggerService,
  ) {
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

  async processScraper(job: Job<ScrapeProcessDto>) {
    try {
      console.log('Processing scraper ' + job.data.id);
      const { id } = job.data;
      const scraper = await this.scraperRepository.findOne({
        where: { id },
      });
      if (!scraper) {
        return false;
      }

      const scrapeResult = await this.puppeteerService.scrape(scraper.url);
      scraper.imageUrls = [
        ...(scraper.imageUrls || []),
        ...scrapeResult.imageUrls,
      ];
      scraper.videoUrls = [
        ...(scraper.videoUrls || []),
        ...scrapeResult.videoUrls,
      ];
      scraper.status = ScraperStatus.COMPLETED;
      await this.scraperRepository.save(scraper);
      return true;
    } catch (error) {
      this.loggerService.log({
        message: error?.message,
        url: `process ${job.name}`,
        body: JSON.stringify(job.data),
      });
      return;
    }
  }
}
