import { Injectable } from '@nestjs/common';
import { MediaRepository } from './repository/media.repository';
import { UserEntity } from '../user/entity/user.entity';
import { GetMediaDto } from './dto/get-media.dto';
import { calPaginationRes } from 'src/utils/pagination.util';
import { Brackets } from 'typeorm';

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
      mediaQuery.andWhere(
        new Brackets((qb) => {
          qb.where('media.url LIKE :search', {
            search: `%${payload.search}%`,
          }).orWhere('scraper.url LIKE :search', {
            search: `%${payload.search}%`,
          });
        }),
      );
    }

    if (payload.type) {
      mediaQuery.andWhere('media.type = :type', {
        type: payload.type,
      });
    }
    if (payload.scraperId) {
      mediaQuery.andWhere('media.scraperId = :scraperId', {
        scraperId: payload.scraperId,
      });
    }
    const [media, total] = await mediaQuery
      .skip((payload.page - 1) * payload.limit)
      .take(payload.limit)
      .orderBy('media.createdAt', 'DESC')
      .getManyAndCount();
    return {
      media,
      ...calPaginationRes({
        totalCount: total,
        page: payload.page,
        limit: payload.limit,
      }),
    };
  }
}
