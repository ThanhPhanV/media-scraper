import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../entity/user.entity';

export class CreateUserDto extends UserEntity {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
