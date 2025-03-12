import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { ScrapeProcessDto } from '../dto/scrap-process-payload.dto';
import { ScraperProcessQueueJob } from '../enum/scraper-process-queue.enum';
import { ScraperQueueName } from '../enum/scraper-queue-name.enum';
import { ScraperStatus } from '../enum/scraper-status.enum';
import { ScraperRepository } from '../repository/scraper.repository';
import { LoggerService } from '../../../modules/logger/logger.service';
import { DataSource } from 'typeorm';
import { ScraperEntity } from '../entity/scraper.entity';
import { MediaType } from '../../../modules/media/enum/media-type.enum';
import { MediaEntity } from '../../../modules/media/entity/media.entity';
import { PlaywrightService } from '../playwright.service';

@Processor(ScraperQueueName.SCRAPER_PROCESSING_QUEUE)
@Injectable()
export class ScraperProcessingConsumer extends WorkerHost {
  constructor(
    private readonly scraperRepository: ScraperRepository,
    private readonly playwrightService: PlaywrightService,
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
    let shouldRetry = false;
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

      const scrapeResult = await this.playwrightService.scrape(scraper.url);
      const mediaPayload = [];
      if (!scrapeResult.error) {
        mediaPayload.push(
          ...scrapeResult.imageUrls.map((mediaUrl) => ({
            url: mediaUrl,
            type: MediaType.IMAGE,
            scraperId: scraper.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })),
        );
        mediaPayload.push(
          ...scrapeResult.imageUrls.map((mediaUrl) => ({
            url: mediaUrl,
            type: MediaType.IMAGE,
            scraperId: scraper.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })),
        );

        if (mediaPayload.length) {
          await queryRunner.manager
            .getRepository(MediaEntity)
            .save(mediaPayload);
        }
      }

      if (scrapeResult.error) {
        shouldRetry = true;
        this.loggerService.log({
          message: scrapeResult.error,
          url: `process ${job.name} error`,
          body: JSON.stringify(job.data),
        });
      }

      await queryRunner.manager.getRepository(ScraperEntity).save({
        ...scraper,
        status: scrapeResult.error
          ? ScraperStatus.FAILED
          : ScraperStatus.COMPLETED,
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      this.loggerService.log({
        message: error?.message,
        url: `process ${job.name}`,
        body: JSON.stringify(job.data),
      });
    } finally {
      await queryRunner.release();
      if (shouldRetry) {
        return job.retry();
      }
      return true;
    }
  }
}
