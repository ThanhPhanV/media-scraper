import { ICalPagiPayload, ICalPagiRes } from './dto/pagination.dto';

export function calPaginationRes({
  totalCount,
  page,
  limit,
}: ICalPagiPayload): ICalPagiRes {
  return {
    totalPage: Math.ceil(totalCount / limit),
    page,
    totalCount,
  };
}
