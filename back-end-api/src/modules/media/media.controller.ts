import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { MediaService } from './media.service';
import { GetMediaDto } from './dto/get-media.dto';

@UseGuards(AuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Get()
  async getMedia(@Query() query: GetMediaDto, @Req() req: any) {
    return this.mediaService.getMedia(query, req.user);
  }
}
