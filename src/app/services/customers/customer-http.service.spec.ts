import { TestBed } from '@angular/core/testing';

import { CustomerHttpService } from './customer-http.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CustomerHttpService', () => {
  let service: CustomerHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(CustomerHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
