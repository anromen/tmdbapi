import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TmdbService } from './tmdb.service';

@ApiTags('tmdb')
@Controller('tmdb')
export class TmdbController {
  constructor(private readonly request: TmdbService) {}

  @Get('best-of-week')
  GetLista() {
    return this.request.getWeekTrendingMovies();
  }
}
