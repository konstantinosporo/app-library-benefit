import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { ReservationHttpService } from '../../services/reservations/reservation-http.service';
import { BookHttpService } from '../../services/book/book-http.service';
import { CustomerHttpService } from '../../services/customers/customer-http.service';
import { AddReservationComponent } from './add-reservation.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AddReservationComponent', () => {
  let component: AddReservationComponent;
  let fixture: ComponentFixture<AddReservationComponent>;
  let httpTestingController: HttpTestingController;


  const mockActivatedRoute = {
    params: of({ name: 'Sample Book' })
  };

  const mockReservationHttpService = {
    addReservation: jasmine.createSpy('addReservation').and.returnValue(of({ success: true }))
  };

  // const mockBookHttpService = {
  //   getAvailableBooks: jasmine.createSpy('getAvailableBooks').and.returnValue(of([{ _id: '1', name: 'Sample Book', available: true }])),
  //   getBookIdByName: jasmine.createSpy('getBookIdByName').and.returnValue(of('1')),
  //   getBookById: jasmine.createSpy('getBookById').and.returnValue(of({ available: true }))
  // };

  // const mockCustomerHttpService = {
  //   getCustomers: jasmine.createSpy('getCustomers').and.returnValue(of([{ _id: '1', name: 'John', surname: 'Doe' }])),
  //   getCustomerIdByName: jasmine.createSpy('getCustomerIdByName').and.returnValue(of('1'))
  // };

  const mockAlertService = {
    showSuccessModal: jasmine.createSpy('showSuccessModal'),
    showSuccessToast: jasmine.createSpy('showSuccessToast'),
    showDangerToast: jasmine.createSpy('showDangerToast')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddReservationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ReservationHttpService, useValue: mockReservationHttpService },
        // { provide: BookHttpService, useValue: mockBookHttpService },
        // { provide: CustomerHttpService, useValue: mockCustomerHttpService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouter },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddReservationComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.reservationFormControl.value).toEqual({
      bookName: '',
      customerName: '',
      returnBy: null
    });
  });

  // it('should load available books and customers on initialization', () => {
  //   expect(mockBookHttpService.getAvailableBooks).toHaveBeenCalled();
  //   expect(mockCustomerHttpService.getCustomers).toHaveBeenCalled();
  // });

  // it('should patch the form with the book name from route params', () => {
  //   component.ngOnInit(); // Call ngOnInit to patch the form
  //   expect(component.reservationFormControl.controls['bookName'].value).toBe('Sample Book');
  // });

  it('should successfully add a reservation and show success modal', () => {
    component.reservationFormControl.setValue({
      bookName: 'Sample Book',
      customerName: 'John Doe',
      returnBy: new Date().toISOString()
    });

    component.addReservation(); // Simulate adding a reservation

    expect(mockReservationHttpService.addReservation).toHaveBeenCalled();
    expect(mockAlertService.showSuccessModal).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['reservations']); // Assuming you navigate to 'reservations' after adding
  });

  // it('should show a danger toast if the book is not available', () => {
  //   mockBookHttpService.getBookById.and.returnValue(of({ available: false })); // Simulate unavailable book
  //   component.reservationFormControl.setValue({
  //     bookName: 'Sample Book',
  //     customerName: 'John Doe',
  //     returnBy: new Date().toISOString()
  //   });

  //   component.confirmCreation(); // Simulate confirmation of creation

  //   expect(mockAlertService.showDangerToast).toHaveBeenCalledWith('The book is already reserved!');
  // });
});
