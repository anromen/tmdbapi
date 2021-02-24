import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseService } from '../firebase/firebase.service';
import { TmdbService } from './tmdb.service';

@ApiTags('tmdb')
@Controller('tmdb')
export class TmdbController {
  constructor(
    private readonly request: TmdbService,
    private readonly fire: FirebaseService,
  ) {}

  @Get('best-of-week')
  async GetLista() {
    const { results } = await this.request.getWeekTrendingMovies();

    const toReturn = await Promise.all(
      results.map(async ({ original_title, overview, id }) => {
        const { crew } = await this.request.getMovieCredits(id);
        const screenplay = crew.find(({ job }) => job === 'Screenplay');

        return {
          id,
          name: original_title,
          overview,
          screenplay: screenplay?.name || '',
        };
      }),
    );

    await Promise.all(
      toReturn.map(async ({ id, ...data }) => await this.fire.post(data, id)),
    );

    return toReturn;
  }
}
