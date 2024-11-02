import { TestBed } from '@angular/core/testing';

import { HealthCheckService } from './health-check.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(HealthCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
