import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BasePaginationDto } from '../../../common/dto/pagination.dto';

export class GetScraperDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status?: string;
}
