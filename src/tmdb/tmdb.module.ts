import { HttpModule, Module } from '@nestjs/common';
import { RequestTmdbService } from 'src/request-tmdb/request-tmdb.service';
import { TmdbController } from './tmdb.controller';
import { TmdbService } from './tmdb.service';

@Module({
  imports: [HttpModule],
  controllers: [TmdbController],
  providers: [TmdbService, RequestTmdbService],
})
export class TmdbModule {}
