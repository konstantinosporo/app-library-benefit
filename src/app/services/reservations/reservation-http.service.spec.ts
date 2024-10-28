import { TestBed } from '@angular/core/testing';

import { ReservationHttpService } from './reservation-http.service';

describe('ReservationHttpService', () => {
  let service: ReservationHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
