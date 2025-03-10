import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { ConfigService } from '@nestjs/config';
import { AppTransformer } from 'src/utils/class-transform.util';
import * as bcrypt from 'bcrypt';
import { SystemException } from 'src/common/system-exception/sytem-exception';
import { AppError } from 'src/common/error/app-error';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async signUp(payload: any) {
    const userExists = await this.userRepo.exists({
      where: { userName: payload.userName },
    });

    if (userExists) {
      throw new SystemException(AppError.USER_ALREADY_EXISTS);
    }

    const hash = await bcrypt.hash(
      payload.password,
      Number(this.configService.get('BCRYPT_SALT_ROUNDS')),
    );
    const user = await this.userRepo.save({
      ...payload,
      password: hash,
    });
    return AppTransformer.instanceToPlain(user);
  }

  async verifyCredentials(userName: string, password: string) {
    const user = await this.userRepo.findOne({ where: { userName } });
    if (!user) {
      throw new SystemException(AppError.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new SystemException(AppError.UNAUTHORIZED);
    }

    return AppTransformer.instanceToPlain(user);
  }
}
