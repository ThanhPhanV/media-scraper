import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ScraperEntity } from '../entity/scraper.entity';

@Injectable()
export class ScraperRepository extends Repository<ScraperEntity> {
  constructor(dataSource: DataSource) {
    super(ScraperEntity, dataSource.createEntityManager());
  }
}
