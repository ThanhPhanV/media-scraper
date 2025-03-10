import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Expose } from 'class-transformer';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Expose()
  @Column({ nullable: false, name: 'user_name', unique: true })
  userName: string;

  @Column({ nullable: false, name: 'password' })
  password: string;
}
