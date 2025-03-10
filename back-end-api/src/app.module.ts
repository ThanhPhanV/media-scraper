import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ScraperModule } from './modules/scraper/scraper.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResTransformInterceptor } from './interceptor/response-transform.itct';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config/database.config';
import { LoggerService } from './modules/logger/logger.service';
import { LoggerRepository } from './modules/logger/repository/logger.repository';
import { LoggerEntity } from './modules/logger/entity/logger.entity';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { CatchEverythingFilter } from './filter/all-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    TypeOrmModule.forFeature([LoggerEntity]),
    AuthModule,
    ScraperModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    LoggerRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResTransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
