import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('scraper')
export class ScraperController {
  @Get()
  async scrape() {
    return 'Scraping...';
  }
}
