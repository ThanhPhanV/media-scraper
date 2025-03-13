import { IScraper } from "./scraper.interface";

export interface IMedia {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  url?: string;
  status?: string;
  scraperId?: string;
  type?: string;
  scraper?: IScraper;
}
