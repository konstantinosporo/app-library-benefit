import { TestBed } from '@angular/core/testing';

import { ReservationHttpService } from './reservation-http.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ReservationHttpService', () => {
  let service: ReservationHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(ReservationHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
