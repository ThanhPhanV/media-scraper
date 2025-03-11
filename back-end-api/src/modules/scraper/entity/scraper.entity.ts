import { BaseEntity } from '../../../common/entity/base.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { ScraperStatus } from '../enum/scraper-status.enum';
import { MediaEntity } from './media.entity';
import { UserEntity } from '../../../modules/user/entity/user.entity';

@Entity({ name: 'scraper' })
export class ScraperEntity extends BaseEntity {
  @Column({ name: 'url', unique: true })
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

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.scrapers)
  @JoinTable({ name: 'user_id' })
  user: UserEntity;
}
