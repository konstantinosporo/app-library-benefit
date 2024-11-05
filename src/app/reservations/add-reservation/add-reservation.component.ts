import { AsyncPipe, JsonPipe, NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { BookApi } from '../../books/book/book';
import { CustomerApi } from '../../customers/customer';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { BookHttpService } from '../../services/book/book-http.service';
import { CustomerHttpService } from '../../services/customers/customer-http.service';
import { ReservationHttpService } from '../../services/reservations/reservation-http.service';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { ReservationApi } from '../reservation';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { futureDateValidator } from './custom-validation';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule,
    NgClass, AsyncPipe, JsonPipe,
    BasicWrapperComponent,
    SpinnerComponent,
    NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent,],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.css'
})
export class AddReservationComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  backButton: { title: string, route: string } = { title: 'Back', route: '/reservations' };
  reservationFormControl!: FormGroup;

  availableBooks$!: Observable<(BookApi | undefined)[]>;
  availableBookNames$!: Observable<(string | undefined)[]>;
  selectedBookId$!: Observable<(string | undefined)>;

  allCustomers$!: Observable<CustomerApi[]>;
  customerNames$!: Observable<(string | undefined)[]>;
  selectedCustomerId$!: Observable<(string | undefined)>;

  paramId: string | null = null;

  constructor(
    private readonly reservationService: ReservationHttpService,
    private readonly bookHttpService: BookHttpService,
    private readonly customerHttpService: CustomerHttpService,
    private readonly alertService: AlertService,
    private readonly route: ActivatedRoute,
    private readonly router: Router

  ) {
    this.reservationFormControl = new FormGroup({
      bookName: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      returnBy: new FormControl('', [Validators.required, futureDateValidator()]),
    });

    this.availableBooks$ = this.bookHttpService.getAvailableBooks();
    this.allCustomers$ = this.customerHttpService.getCustomers();

    this.availableBookNames$ = this.availableBooks$.pipe(map(books => books.map(book => book?.name)));
    this.customerNames$ = this.allCustomers$.pipe(map(customers => customers.map(customer => (customer.name + ' ' + customer.surname))));
    // Scenario where i press quick reservation.
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.paramId = params['id'];

      // check if the params have an id first
      if (this.paramId) {
        this.bookHttpService.getBookById(this.paramId).pipe(takeUntil(this.destroy$)).subscribe(book => {
          // book is the result from the HTTP call
          this.reservationFormControl.patchValue({
            bookName: book.name // here i have access to the requested book if there is one
          });
          this.handleSelectedBook(); // Call after I have the book data
        });
      }
    });

  }
  /**@konstantinosporo
   * @description Same proccess!!
   */
  addReservation() {
    this.alertService.showSuccessModal('Confirm Creation', `Are you sure you want to reserve ${this.reservationFormControl.controls['bookName'].value} to  ${this.reservationFormControl.controls['customerName'].value}?`, () => this.confirmCreation(), "Save");
  }
  handleSelectedBook() {
    //console.log('clicked');
    const selectedBookName: string = this.reservationFormControl.controls['bookName'].value;
    if (this.reservationFormControl.controls['bookName'].value) {
      this.selectedBookId$ = this.bookHttpService.getBookIdByName(selectedBookName);
    }
  }
  handleSelectedCustomer() {
    //console.log('clicked');
    const selectedCustomerName: string = this.reservationFormControl.controls['customerName'].value;
    if (this.reservationFormControl.controls['bookName'].value) {
      this.selectedCustomerId$ = this.customerHttpService.getCustomerIdByName(selectedCustomerName.split(' ')[0]);
    }
  }
  /**
   * @konstantinosporo
   * @description Triggered after confirming the action modal. Method to create a new BookApi object, and adding it
   *  in the API endpoint. It also uses alert service and global error service for outputing success and, error messages.
   */
  confirmCreation() {
    if (this.reservationFormControl.valid) {
      // Using combineLatest to retrieve both selectedBookId and selectedCustomerId together
      combineLatest([this.selectedBookId$, this.selectedCustomerId$])
        .pipe(
          takeUntil(this.destroy$),
          switchMap(([selectedBookId, selectedCustomerId]) => {
            if (!selectedBookId || !selectedCustomerId) {
              this.alertService.showDangerToast('Please select both a book and a customer.');
              throw new Error('Selection is incomplete');
            }

            const newReservation: ReservationApi = {
              bookId: selectedBookId,
              customerId: selectedCustomerId,
              returnBy: this.reservationFormControl.controls['returnBy'].value
                ? new Date(this.reservationFormControl.controls['returnBy'].value).toISOString()
                : new Date().toISOString(),
            };

            // Check if the book is still available before adding the reservation
            return this.bookHttpService.getBookById(newReservation.bookId as string).pipe(
              tap(book => {
                if (!book.available) {
                  throw new Error('Book is already reserved');
                }
              }),
              switchMap(() => this.reservationService.addReservation(newReservation))
            );
          })
        )
        .subscribe({
          next: (reservation: ReservationApi) => {
            this.alertService.showSuccessToast(`${this.reservationFormControl.controls['bookName'].value} was reserved to ${this.reservationFormControl.controls['customerName'].value} successfully!`);
            this.router.navigate(['reservations']);
          },
          error: (err) => {
            if (err.message === 'Book is already reserved') {
              this.alertService.showDangerToast('The book is already reserved!');
            } else {
              this.alertService.showDangerToast('Error creating reservation!');
            }
          }
        });
    }
  }
  /**
   * @konstantinosporo
   * @description
   * Manual unsubrcription because i manually subscribe
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
