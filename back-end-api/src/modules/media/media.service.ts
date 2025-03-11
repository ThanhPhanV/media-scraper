import { Injectable } from '@nestjs/common';
import { MediaRepository } from './repository/media.repository';
import { UserEntity } from '../user/entity/user.entity';
import { GetMediaDto } from './dto/get-media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}
  async getMedia(payload: GetMediaDto, user: UserEntity) {
    const mediaQuery = this.mediaRepository.createQueryBuilder('media');
    mediaQuery.innerJoinAndSelect(
      'media.scraper',
      'scraper',
      'scraper.userId = :userId',
      {
        userId: user.id,
      },
    );

    if (payload.search) {
      mediaQuery.andWhere('media.url LIKE :search', {
        search: `%${payload.search}%`,
      });
    }
    if (payload.type) {
      mediaQuery.andWhere('media.type = :type', {
        type: payload.type,
      });
    }
    const [scrapers, total] = await mediaQuery
      .skip((payload.page - 1) * payload.limit)
      .take(payload.limit)
      .getManyAndCount();
    return { scrapers, total };
  }
}
