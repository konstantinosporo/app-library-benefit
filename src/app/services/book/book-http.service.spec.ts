import { TestBed } from '@angular/core/testing';

import { BookHttpService } from './book-http.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BookHttpService', () => {
  let service: BookHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]

    });
    service = TestBed.inject(BookHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
