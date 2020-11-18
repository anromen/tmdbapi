import { HttpException, Injectable } from '@nestjs/common';
import { RequestTmdbService } from 'src/request-tmdb/request-tmdb.service';

@Injectable()
export class TmdbService {
  constructor(private readonly request: RequestTmdbService) {}

  async getWeekTrendingMovies() {
    try {
      return await this.request.get('trending/movie/week').toPromise();
    } catch (error) {
      throw new HttpException('get_movies_error', 400);
    }
  }
}
