import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BasePaginationDto } from '../../../common/dto/pagination.dto';
import { MediaType } from '../enum/media-type.enum';

export class GetMediaDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: MediaType;
}
