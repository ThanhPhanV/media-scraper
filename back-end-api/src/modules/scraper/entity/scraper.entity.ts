import { BaseEntity } from '../../../common/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ScraperStatus } from '../enum/scraper-status.enum';
import { MediaEntity } from './media.entity';

@Entity({ name: 'scraper' })
export class ScraperEntity extends BaseEntity {
  @Column({ name: 'url' })
  url: string;

  @OneToMany(() => MediaEntity, (media) => media.webPage)
  media: MediaEntity[];

  @Column({
    name: 'status',
    nullable: false,
    default: 'pending',
    type: 'varchar',
  })
  status: ScraperStatus;
}
