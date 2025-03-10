import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateScrapeDto } from './dto/create-scraper.dto';
import { ScraperService } from './scraper.service';

@UseGuards(AuthGuard)
@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post()
  async scrape(@Body() payload: CreateScrapeDto) {
    return this.scraperService.saveInitScrape(payload);
  }

  @Post('process-now')
  async processNow(@Body() payload: CreateScrapeDto) {
    return this.scraperService.processNow(payload);
  }
}
