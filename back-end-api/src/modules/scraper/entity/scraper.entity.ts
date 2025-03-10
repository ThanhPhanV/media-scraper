import { BaseEntity } from '../../../common/entity/base.entity';
import { Column, Entity } from 'typeorm';
import { ScraperStatus } from '../enum/scraper-status.enum';

@Entity({ name: 'scraper' })
export class ScraperEntity extends BaseEntity {
  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'title', nullable: true })
  title?: string;

  @Column({ name: 'image_urls', nullable: true, type: 'jsonb' })
  imageUrls?: string[];

  @Column({ name: 'video_urls', nullable: true, type: 'jsonb' })
  videoUrls?: string[];

  @Column({
    name: 'status',
    nullable: false,
    default: 'pending',
    type: 'varchar',
  })
  status: ScraperStatus;
}
