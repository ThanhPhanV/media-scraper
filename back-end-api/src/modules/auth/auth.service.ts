import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
import { BasicSignInDto } from './dto/basic-sign-in';
import { AppTransformer } from 'src/utils/class-transform.util';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async basicSignIn(
    payload: BasicSignInDto,
  ): Promise<{ user: UserEntity; token: string }> {
    const { userName, password } = payload;
    const user = await this.userService.verifyCredentials(userName, password);
    return {
      token: Buffer.from(`${user.userName}:${password}`).toString('base64'),
      user: AppTransformer.instanceToPlain(user),
    };
  }
}
