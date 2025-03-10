import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Expose } from 'class-transformer';

@Entity({ name: 'logger' })
export class LoggerEntity extends BaseEntity {
  @Expose()
  @Column({ nullable: true, name: 'url' })
  url?: string;

  @Column({ nullable: true, name: 'body', type: 'jsonb' })
  body?: any;

  @Column({ nullable: true, name: 'message' })
  message?: string;

  @Column({ nullable: true, name: 'status' })
  status?: number;

  @Column({ nullable: true, name: 'method' })
  method?: string;

  @Column({ nullable: true, name: 'res', type: 'jsonb' })
  res?: any;
}
