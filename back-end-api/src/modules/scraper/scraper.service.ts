import { Injectable } from '@nestjs/common';
import { ScraperRepository } from './repository/scraper.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CreateScrapeDto } from './dto/create-scraper.dto';
import { ScraperQueueName } from './enum/scraper-queue-name.enum';
import { ScraperProcessQueueJob } from './enum/scraper-process-queue.enum';
import { GetScraperDto } from './dto/get-scraper.dto';
import { UserEntity } from '../user/entity/user.entity';
import { calPaginationRes } from 'src/utils/pagination.util';
import { PlaywrightService } from './playwright.service';

@Injectable()
export class ScraperService {
  constructor(
    private readonly scraperRepository: ScraperRepository,
    private readonly playwrightService: PlaywrightService,
    @InjectQueue(ScraperQueueName.SCRAPER_PROCESSING_QUEUE)
    private scraperProcessingQueue: Queue,
  ) {}

  async saveInitScrape(payload: CreateScrapeDto, user: UserEntity) {
    return this.playwrightService.scrape(payload.urls[0]);
  }

  async getScrapers(payload: GetScraperDto, user: UserEntity) {
    const scrapeQuery = this.scraperRepository.createQueryBuilder('scrape');
    scrapeQuery.where('scrape.userId = :userId', { userId: user.id });
    if (payload.search) {
      scrapeQuery.andWhere('scrape.url LIKE :search', {
        search: `%${payload.search}%`,
      });
    }
    if (payload.status) {
      scrapeQuery.andWhere('scrape.status = :status', {
        status: payload.status,
      });
    }
    const [scrapers, total] = await scrapeQuery
      .skip((payload.page - 1) * payload.limit)
      .take(payload.limit)
      .orderBy('scrape.createdAt', 'DESC')
      .getManyAndCount();

    return {
      scrapers,
      ...calPaginationRes({
        totalCount: total,
        page: payload.page,
        limit: payload.limit,
      }),
    };
  }
}
