import { TestBed } from '@angular/core/testing';

import { CustomerHttpService } from './customer-http.service';

describe('CustomerHttpService', () => {
  let service: CustomerHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
