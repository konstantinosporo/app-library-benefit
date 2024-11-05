import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiStatus, endpoints } from './api';
import { HealthCheckService } from './health-check.service';

describe('HealthCheckService', () => {
  let service: HealthCheckService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(HealthCheckService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return the correct status for all endpoints', () => {
    const expectedStatuses: ApiStatus[] = endpoints.map(api => ({
      title: api.title,
      endpoint: api.endpoint,
      status: true // assume all are online at first
    }));

    service.checkApiStatus().subscribe(statuses => {
      expect(statuses).toEqual(expectedStatuses); // check if res = expectedStatuses
    });

    // expect a res for each api
    endpoints.forEach(api => {
      const req = httpTestingController.expectOne(api.endpoint);
      req.flush({}); // .flush basically is a success response
    });
  });

  it('should return correct status for mixed endpoints: some online, some offline', () => {
    const expectedStatuses: ApiStatus[] = [
      { title: 'Books', endpoint: 'https://book-api-bx2r.onrender.com/books', status: true },
      { title: 'Customers', endpoint: 'https://book-api-bx2r.onrender.com/customers', status: false },
      { title: 'Reservations', endpoint: 'https://book-api-bx2r.onrender.com/reservations', status: false } // simulate two offline apis
    ];

    service.checkApiStatus().subscribe(statuses => {
      expect(statuses).toEqual(expectedStatuses);
    });

    // mock success
    const req1 = httpTestingController.expectOne(endpoints[0].endpoint);
    req1.flush({}); // success

    // mock error
    const req2 = httpTestingController.expectOne(endpoints[1].endpoint);
    req2.error(new ProgressEvent('Network error')); // error

    // mock error
    const req3 = httpTestingController.expectOne(endpoints[2].endpoint);
    req3.error(new ProgressEvent('Network error'));// error
  });
});
