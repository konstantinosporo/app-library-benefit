import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BookHttpService } from './book-http.service'; // Adjust the path as needed
import { BookApi } from '../../books/book/book';
import { provideHttpClient } from '@angular/common/http';

describe('BookHttpService', () => {
  let service: BookHttpService;
  let httpTestingController: HttpTestingController;

  const mockBooks: BookApi[] = [
    { _id: '1', name: 'Book One', available: true, type: 'Fiction', year: 2021, author: 'Author One', createdOn: new Date() },
    { _id: '2', name: 'Book Two', available: true, type: 'Fiction', year: 2020, author: 'Author Two', createdOn: new Date() }
  ];
  const mockBook: BookApi = { _id: '1', name: 'Book One', available: true, type: 'Fiction', year: 2021, author: 'Author One', createdOn: new Date() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookHttpService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(BookHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch all books', () => {
    service.getBooks().subscribe((books) => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpTestingController.expectOne(service.bookApiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBooks);
  });

  it('should fetch a book by ID', () => {
    service.getBookById('1').subscribe(book => {
      expect(book).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne(`${service.bookApiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });

  it('should add a new book', () => {
    service.addBook(mockBook).subscribe(book => {
      expect(book).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne(service.bookApiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockBook);
  });

  it('should edit an existing book', () => {
    service.editBook(mockBook).subscribe(book => {
      expect(book).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne(`${service.bookApiUrl}/${mockBook._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockBook);
  });

  it('should delete an existing book', () => {
    service.deleteBookById('1').subscribe(book => {
      expect(book).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne(`${service.bookApiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockBook);
  });

  it('should return the count of available books grouped by type', () => {
    const expectedResult = [
      { value: 2, type: 'Fiction' }
    ];

    service.getAvailableBooksCountByType().subscribe(result => {
      expect(result).toEqual(expectedResult);
    });

    const req = httpTestingController.expectOne(service.bookApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks); // Simulate a successful response with the mock data
  });



  it('should return expected books (HttpClient called once)', () => {
    const expectedBooks: BookApi[] = mockBooks;

    service.getBooks().subscribe(books => {
      expect(books).toEqual(expectedBooks);
    });

    const req = httpTestingController.expectOne(service.bookApiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedBooks); // Mocking a successful response
  });

  it('should handle a 404 error response', () => {
    service.getBooks().subscribe({
      next: () => fail('expected an error, not books'),
      error: (error) => expect(error.status).toBe(404) // Assert the error status
    });

    const req = httpTestingController.expectOne(service.bookApiUrl);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Mocking a 404 error
  });

  it('should handle a 400 error response', () => {
    service.getBooks().subscribe({
      next: () => fail('expected an error, not books'),
      error: (error) => expect(error.status).toBe(400) // Assert the error status
    });

    const req = httpTestingController.expectOne(service.bookApiUrl);
    req.flush('Bad Request', { status: 400, statusText: 'Bad Request' }); // Mocking a 400 error
  });

  it('should handle a 503 error response', () => {
    service.getBooks().subscribe({
      next: () => fail('expected an error, not books'),
      error: (error) => expect(error.status).toBe(503) // Assert the error status
    });

    const req = httpTestingController.expectOne(service.bookApiUrl);
    req.flush('Service Unavailable', { status: 503, statusText: 'Service Unavailable' }); // Mocking a 503 error
  });

  it('should handle a 500 error response', () => {
    // Call the service method
    service.getBooks().subscribe({
      next: () => fail('expected an error, not books'),
      error: (error) => expect(error.status).toBe(500) // Assert the error status
    });

    // Expect a request to the book API URL
    const req = httpTestingController.expectOne(service.bookApiUrl);
    req.flush('Failed!', { status: 500, statusText: 'Internal Server Error' }); // Mocking a server error
  });

  it('should handle a network error', () => {
    service.getBooks().subscribe({
      next: () => fail('expected an error, not books'),
      error: (error) => expect(error.message).toContain('Http failure response for https://book-api-bx2r.onrender.com/books: 0 ') // Check for a specific message or type
    });

    const req = httpTestingController.expectOne(service.bookApiUrl);
    req.error(new ProgressEvent('Network error')); // Mocking a network error with ProgressEvent
  });




});
