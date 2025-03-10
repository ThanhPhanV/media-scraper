import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { UserModule } from '../user/user.module';
import { ScraperRepository } from './repository/scraper.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperEntity } from './entity/scraper.entity';
import { BullModule } from '@nestjs/bullmq';
import { ScraperQueueName } from './enum/scraper-queue-name.enum';
import { ScraperStorageConsumer } from './consumer/scraper-storage.consumer';
import { ScraperProcessingConsumer } from './consumer/scraper-processing.consumer';
import { PuppeteerService } from './puppeteer.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([ScraperEntity]),
    BullModule.registerQueue({
      name: ScraperQueueName.SCRAPER_STORAGE_QUEUE,
    }),
    BullModule.registerQueue({
      name: ScraperQueueName.SCRAPER_PROCESSING_QUEUE,
    }),
    LoggerModule,
  ],
  controllers: [ScraperController],
  providers: [
    ScraperService,
    ScraperRepository,
    ScraperStorageConsumer,
    ScraperProcessingConsumer,
    {
      provide: PuppeteerService,
      useValue: new PuppeteerService(),
    },
  ],
})
export class ScraperModule {}
