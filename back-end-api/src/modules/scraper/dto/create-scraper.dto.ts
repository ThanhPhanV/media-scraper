import { IsString } from 'class-validator';

export class CreateScrapeDto {
  @IsString({ each: true })
  urls: string[];
}
