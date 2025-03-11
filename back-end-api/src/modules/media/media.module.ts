import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './entity/media.entity';
import { MediaRepository } from './repository/media.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity])],
  providers: [MediaService, MediaRepository],
  controllers: [MediaController],
})
export class MediaModule {}
