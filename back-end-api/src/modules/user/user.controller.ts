import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller({
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUp(@Body() payload: CreateUserDto) {
    return this.userService.signUp(payload);
  }
}
