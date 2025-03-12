import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateScrapeDto } from './dto/create-scraper.dto';
import { ScraperService } from './scraper.service';
import { GetScraperDto } from './dto/get-scraper.dto';

@UseGuards(AuthGuard)
@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post()
  async scrape(@Body() payload: CreateScrapeDto, @Req() req: any) {
    return this.scraperService.saveInitScrape(payload, req.user);
  }

  @Post('v2')
  async scrapeV2(@Body() payload: CreateScrapeDto, @Req() req: any) {
    return this.scraperService.saveInitScrapeV2(payload, req.user);
  }

  @Get()
  async getScrapers(@Query() query: GetScraperDto, @Req() req: any) {
    return this.scraperService.getScrapers(query, req.user);
  }
}
