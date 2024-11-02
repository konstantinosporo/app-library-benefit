import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomerHttpService } from './customer-http.service';
import { CustomerApi } from '../../customers/customer';

describe('CustomerHttpService', () => {
  let service: CustomerHttpService;
  let httpTestingController: HttpTestingController;

  const mockCustomer = { _id: '1', name: 'John', surname: 'Doe', email: 'john.doe@example.com', phoneNumber: '123-456-7890' };
  const mockCustomers = [
    { _id: '1', name: 'One', surname: 'Test', email: 'test.1@example.com', phoneNumber: '111111111111' },
    { _id: '2', name: 'Two', surname: 'Test2', email: 'test.2@example.com', phoneNumber: '222222222222' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerHttpService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CustomerHttpService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all customers', () => {
    service.getCustomers().subscribe((customers) => {
      expect(customers).toEqual(mockCustomers);
    });

    const req = httpTestingController.expectOne(service.customerApiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCustomers);
  });

  it('should fetch a customer by ID', () => {
    service.getCustomerById('1').subscribe(customer => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpTestingController.expectOne(`${service.customerApiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomer);
  });

  it('should add a new customer', () => {
    service.addCustomer(mockCustomer).subscribe(customer => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpTestingController.expectOne(service.customerApiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockCustomer);
  });

  it('should edit an existing customer', () => {
    service.editCustomer(mockCustomer).subscribe(customer => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpTestingController.expectOne(`${service.customerApiUrl}/${mockCustomer._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockCustomer);
  });

  it('should delete an existing customer', () => {
    service.deleteCustomerById('1').subscribe(customer => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpTestingController.expectOne(`${service.customerApiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockCustomer);
  });


  it('should return expected customers (HttpClient called once)', () => {
    const expectedCustomers: CustomerApi[] = mockCustomers;

    service.getCustomers().subscribe(customers => {
      expect(customers).toEqual(expectedCustomers);
    });

    const req = httpTestingController.expectOne(service.customerApiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedCustomers); // Mocking a successful response
  });

  it('should handle a 404 error response', () => {
    service.getCustomers().subscribe({
      next: () => fail('expected an error, not customers'),
      error: (error) => expect(error.status).toBe(404) // Assert the error status
    });

    const req = httpTestingController.expectOne(service.customerApiUrl);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Mocking a 404 error
  });

  it('should handle a 400 error response', () => {
    service.getCustomers().subscribe({
      next: () => fail('expected an error, not customers'),
      error: (error) => expect(error.status).toBe(400) // Assert the error status
    });

    const req = httpTestingController.expectOne(service.customerApiUrl);
    req.flush('Bad Request', { status: 400, statusText: 'Bad Request' }); // Mocking a 400 error
  });

  it('should handle a 503 error response', () => {
    service.getCustomers().subscribe({
      next: () => fail('expected an error, not customers'),
      error: (error) => expect(error.status).toBe(503) // Assert the error status
    });

    const req = httpTestingController.expectOne(service.customerApiUrl);
    req.flush('Service Unavailable', { status: 503, statusText: 'Service Unavailable' }); // Mocking a 503 error
  });

  it('should handle a 500 error response', () => {
    // Call the service method
    service.getCustomers().subscribe({
      next: () => fail('expected an error, not customers'),
      error: (error) => expect(error.status).toBe(500) // Assert the error status
    });

    // Expect a request to the customer API URL
    const req = httpTestingController.expectOne(service.customerApiUrl);
    req.flush('Failed!', { status: 500, statusText: 'Internal Server Error' }); // Mocking a server error
  });

  it('should handle a network error', () => {
    service.getCustomers().subscribe({
      next: () => fail('expected an error, not customers'),
      error: (error) => expect(error.message).toContain('Http failure response for https://book-api-bx2r.onrender.com/customers: 0 ') // Check for a specific message or type
    });

    const req = httpTestingController.expectOne(service.customerApiUrl);
    req.error(new ProgressEvent('Network error')); // Mocking a network error with ProgressEvent
  });

});
