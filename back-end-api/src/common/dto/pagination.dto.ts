import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {
  PAGINATION_CONFIG_DEFAULT_LIMIT,
  PAGINATION_CONFIG_DEFAULT_PAGE,
} from '../../config/app.config';

export class BasePaginationDto {
  @IsOptional()
  @Transform(({ value }) =>
    parseInt(value || PAGINATION_CONFIG_DEFAULT_PAGE, 10),
  )
  page: number;

  @IsOptional()
  @Transform(({ value }) =>
    parseInt(value || PAGINATION_CONFIG_DEFAULT_LIMIT, 10),
  )
  limit: number;

  constructor(partial?: Partial<BasePaginationDto>) {
    this.page = partial?.page
      ? Number(partial?.page)
      : PAGINATION_CONFIG_DEFAULT_PAGE;
    this.limit = partial?.limit
      ? Number(partial?.limit)
      : PAGINATION_CONFIG_DEFAULT_LIMIT;
  }
}
