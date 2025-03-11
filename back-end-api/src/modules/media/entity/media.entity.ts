import { BaseEntity } from '../../../common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MediaType } from '../enum/media-type.enum';
import { ScraperEntity } from '../../../modules/scraper/entity/scraper.entity';

@Entity({ name: 'media' })
export class MediaEntity extends BaseEntity {
  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'type', nullable: false, type: 'varchar' })
  type: MediaType;

  @Column({ name: 'scraper_id' })
  scraperId: string;

  @ManyToOne(() => ScraperEntity, (scraper) => scraper.id)
  @JoinColumn({ name: 'scraper_id' })
  scraper: ScraperEntity;
}
