import { Test, TestingModule } from '@nestjs/testing';
import { RequestTmdbService } from './request-tmdb.service';

describe('RequestTmdbService', () => {
  let service: RequestTmdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestTmdbService],
    }).compile();

    service = module.get<RequestTmdbService>(RequestTmdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
