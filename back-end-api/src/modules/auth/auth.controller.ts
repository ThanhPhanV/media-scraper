import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicSignInDto } from './dto/basic-sign-in';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() payload: BasicSignInDto) {
    return this.authService.basicSignIn(payload);
  }
}
