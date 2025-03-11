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
import { DataSource } from 'typeorm';
import { ScraperEntity } from '../entity/scraper.entity';
import { MediaType } from '../../../modules/media/enum/media-type.enum';
import { MediaEntity } from '../../../modules/media/entity/media.entity';

@Processor(ScraperQueueName.SCRAPER_PROCESSING_QUEUE)
@Injectable()
export class ScraperProcessingConsumer extends WorkerHost {
  constructor(
    private readonly scraperRepository: ScraperRepository,
    private readonly puppeteerService: PuppeteerService,
    private readonly loggerService: LoggerService,
    private dataSource: DataSource,
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
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const { id } = job.data;
        const scraper = await this.scraperRepository.findOne({
          where: { id },
        });
        if (!scraper) {
          return false;
        }

        const scrapeResult = await this.puppeteerService.scrape(scraper.url);
        const mediaPayload = [];
        if (scrapeResult?.imageUrls?.length) {
          mediaPayload.push(
            ...scrapeResult.imageUrls.map((mediaUrl) => ({
              url: mediaUrl,
              type: MediaType.IMAGE,
              scraperId: scraper.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })),
          );
        }
        if (scrapeResult?.videoUrls?.length) {
          mediaPayload.push(
            ...scrapeResult.imageUrls.map((mediaUrl) => ({
              url: mediaUrl,
              type: MediaType.IMAGE,
              scraperId: scraper.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })),
          );
        }

        await queryRunner.manager.getRepository(MediaEntity).save(mediaPayload);
        await queryRunner.manager.getRepository(ScraperEntity).save({
          ...scraper,
          status: ScraperStatus.COMPLETED,
        });

        await queryRunner.commitTransaction();
      } catch (err) {
        this.loggerService.log({
          message: err?.message,
          url: `process ${job.name}`,
          body: JSON.stringify(job.data),
        });
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
        return true;
      }
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
