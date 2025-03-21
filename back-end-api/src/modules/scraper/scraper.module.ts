import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { UserModule } from '../user/user.module';
import { ScraperRepository } from './repository/scraper.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperEntity } from './entity/scraper.entity';
import { BullModule } from '@nestjs/bullmq';
import { ScraperQueueName } from './enum/scraper-queue-name.enum';
import { ScraperProcessingConsumer } from './consumer/scraper-processing.consumer';
import { LoggerModule } from '../logger/logger.module';
import { MediaEntity } from '../media/entity/media.entity';
import { MediaRepository } from '../media/repository/media.repository';
import { PlaywrightService } from './playwright.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([ScraperEntity, MediaEntity]),
    BullModule.registerQueue({
      name: ScraperQueueName.SCRAPER_PROCESSING_QUEUE,
    }),
    LoggerModule,
  ],
  controllers: [ScraperController],
  providers: [
    ScraperService,
    MediaRepository,
    ScraperRepository,
    ScraperProcessingConsumer,
    {
      provide: PlaywrightService,
      useValue: new PlaywrightService(),
    },
  ],
})
export class ScraperModule {}
