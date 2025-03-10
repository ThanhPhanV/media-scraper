import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MediaEntity } from '../entity/media.entity';

@Injectable()
export class MediaRepository extends Repository<MediaEntity> {
  constructor(dataSource: DataSource) {
    super(MediaEntity, dataSource.createEntityManager());
  }
}
