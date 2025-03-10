import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NodeEnv } from 'src/enum';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: this.configService.get<string>('DB_TYPE') as any,
      host: this.configService.get<string>('DB_HOST'),
      port: parseInt(this.configService.get<string>('DB_PORT'), 10) || 5432,
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      synchronize: false,
      logging:
        this.configService.get<string>('NODE_ENV') !== NodeEnv.Production,
      autoLoadEntities: true,
      poolSize: 10000,
    };
  }
}
