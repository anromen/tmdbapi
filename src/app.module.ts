import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmdbModule } from './tmdb/tmdb.module';
import { RequestTmdbService } from './request-tmdb/request-tmdb.service';

@Module({
  imports: [HttpModule, TmdbModule],
  controllers: [AppController],
  providers: [AppService, RequestTmdbService],
})
export class AppModule {}
