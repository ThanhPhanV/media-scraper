import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const [user, password] = this.getUserCredentialsFromToken(token);
      await this.userService.verifyCredentials(user, password);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Basic' ? token : undefined;
  }

  private decodeBase64(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }

  private getUserCredentialsFromToken(token: string) {
    const decodedToken = this.decodeBase64(token);
    return decodedToken.split(':');
  }
}
