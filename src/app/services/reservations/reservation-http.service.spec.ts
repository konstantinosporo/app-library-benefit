import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { ReservationApi, Status } from '../../reservations/reservation';
import { ReservationHttpService } from './reservation-http.service';
import { BookApi } from '../../books/book/book';
import { CustomerApi } from '../../customers/customer';

describe('ReservationHttpService', () => {
  let service: ReservationHttpService;
  let httpTestingController: HttpTestingController;

  const mockBooks: BookApi[] = [
    { _id: '1', name: 'Book One', available: true, type: 'Fiction', year: 2021, author: 'Author One', createdOn: new Date() },
    { _id: '2', name: 'Book Two', available: true, type: 'Non-Fiction', year: 2020, author: 'Author Two', createdOn: new Date() },
  ];

  const mockCustomers: CustomerApi[] = [
    { _id: '1', name: 'John', surname: 'Doe', email: 'john.doe@example.com', phoneNumber: '123-456-7890' },
    { _id: '2', name: 'Jane', surname: 'Smith', email: 'jane.smith@example.com', phoneNumber: '987-654-3210' },
  ];

  const mockReservations: ReservationApi[] = [
    {
      _id: '1',
      book: mockBooks[0],
      bookId: mockBooks[0]._id,
      customer: mockCustomers[0],
      customerId: mockCustomers[0]._id,
      returnBy: '2024-12-01T00:00:00Z',
      status: Status.ACTIVE,
      reservedOn: new Date(),
      __v: 0,
    },
    {
      _id: '2',
      book: mockBooks[1],
      bookId: mockBooks[1]._id,
      customer: mockCustomers[1],
      customerId: mockCustomers[1]._id,
      returnBy: '2024-12-15T00:00:00Z',
      status: Status.COMPLETED,
      reservedOn: new Date(),
      __v: 0,
    },
  ];

  // Single reservation example
  const mockReservation: ReservationApi = {
    _id: '3',
    book: mockBooks[0],
    bookId: mockBooks[0]._id,
    customer: mockCustomers[1],
    customerId: mockCustomers[1]._id,
    returnBy: '2024-11-25T00:00:00Z',
    status: Status.ACTIVE,
    reservedOn: new Date(),
    __v: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReservationHttpService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ReservationHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch all reservations', () => {
    service.getReservations().subscribe((reservations) => {
      expect(reservations).toEqual(mockReservations);
    });

    const req = httpTestingController.expectOne(service.reservationApiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockReservations);
  });

  it('should fetch a reservation by ID', () => {
    service.getReservationById('1').subscribe(reservation => {
      expect(reservation).toEqual(mockReservation);
    });

    const req = httpTestingController.expectOne(`${service.reservationApiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReservation);
  });

  it('should add a new reservation', () => {
    service.addReservation(mockReservation).subscribe(reservation => {
      expect(reservation).toEqual(mockReservation);
    });

    const req = httpTestingController.expectOne(service.reservationApiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockReservation);
  });

  it('should return expected reservations (HttpClient called once)', () => {
    const expectedReservations: ReservationApi[] = mockReservations;

    service.getReservations().subscribe(reservations => {
      expect(reservations).toEqual(expectedReservations);
    });

    const req = httpTestingController.expectOne(service.reservationApiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedReservations); // Mocking a successful response
  });

  it('should handle a 404 error response', () => {
    service.getReservations().subscribe({
      next: () => fail('expected an error, not reservations'),
      error: (error) => expect(error.status).toBe(404) // Assert the error status
    });

    const req = httpTestingController.expectOne(service.reservationApiUrl);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Mocking a 404 error
  });

  it('should handle a 400 error response', () => {
    service.getReservations().subscribe({
      next: () => fail('expected an error, not reservations'),
      error: (error) => expect(error.status).toBe(400) // Assert the error status
    });

    const req = httpTestingController.expectOne(service.reservationApiUrl);
    req.flush('Bad Request', { status: 400, statusText: 'Bad Request' }); // Mocking a 400 error
  });

  it('should handle a 503 error response', () => {
    service.getReservations().subscribe({
      next: () => fail('expected an error, not reservations'),
      error: (error) => expect(error.status).toBe(503) // Assert the error status
    });

    const req = httpTestingController.expectOne(service.reservationApiUrl);
    req.flush('Service Unavailable', { status: 503, statusText: 'Service Unavailable' }); // Mocking a 503 error
  });

  it('should handle a 500 error response', () => {
    // Call the service method
    service.getReservations().subscribe({
      next: () => fail('expected an error, not reservations'),
      error: (error) => expect(error.status).toBe(500) // Assert the error status
    });

    // Expect a request to the reservation API URL
    const req = httpTestingController.expectOne(service.reservationApiUrl);
    req.flush('Failed!', { status: 500, statusText: 'Internal Server Error' }); // Mocking a server error
  });

  it('should handle a network error', () => {
    service.getReservations().subscribe({
      next: () => fail('expected an error, not reservations'),
      error: (error) => expect(error.message).toContain('Http failure response for https://book-api-bx2r.onrender.com/reservations: 0 ') // Check for a specific message or type
    });

    const req = httpTestingController.expectOne(service.reservationApiUrl);
    req.error(new ProgressEvent('Network error')); // Mocking a network error with ProgressEvent
  });

});
