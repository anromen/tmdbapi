import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class RequestTmdbService {
  url: string = 'https://api.themoviedb.org/3/';
  authToken: string = '3ebed1e420143e37ef293e66f9bad3da';

  constructor(private http: HttpService) {}

  get(path: string) {
    return this.http
      .get(`${this.url}${path}?api_key=${this.authToken}&language=es`)
      .pipe(map((response) => response.data));
  }
}
