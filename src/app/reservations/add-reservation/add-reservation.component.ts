import { AsyncPipe, JsonPipe, NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
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
  backButton: { title: string, route: string } = { title: 'Back to Reservations', route: '/reservations' };
  reservationFormControl!: FormGroup;
  bookIds$!: Observable<(BookApi["_id"] | undefined)[]>;
  customerIds$!: Observable<(CustomerApi["_id"] | undefined)[]>;
  selectedBookTitle$!: Observable<(BookApi["name"] | undefined)>;
  selectedCustomerName$!: Observable<(string | undefined)>;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly reservationService: ReservationHttpService,
    private readonly bookHttpService: BookHttpService,
    private readonly customerHttpService: CustomerHttpService,
    private readonly alertService: AlertService,
    private readonly router: Router

  ) {
    this.reservationFormControl = new FormGroup({
      bookId: new FormControl('', Validators.required),
      customerId: new FormControl('', Validators.required),
      returnBy: new FormControl('', [Validators.required, futureDateValidator()]),
    });
    this.bookIds$ = this.bookHttpService.getAvailableBookIds();
    this.customerIds$ = this.customerHttpService.getAllCustomerIds();
  }
  addReservation() {
    //console.log(id);
    this.alertService.showSuccessModal('Confirm Creation', `Are you sure you want to create reservation?
      Book Details:
      Book ID: ${this.reservationFormControl.controls['bookId'].value}
      Customer ID: ${this.reservationFormControl.controls['customerId'].value}
      `, () => this.confirmCreation(), "Add Reservation");
  }
  handleSelectedBook() {
    //console.log('clicked');
    const selectedBookId: string = this.reservationFormControl.controls['bookId'].value;
    if (this.reservationFormControl.controls['bookId'].value) {
      this.selectedBookTitle$ = this.bookHttpService.getBookNameById(selectedBookId);
    }
  }
  handleSelectedCustomer() {
    //console.log('clicked');
    const selectedCustomerId: string = this.reservationFormControl.controls['customerId'].value;
    if (this.reservationFormControl.controls['bookId'].value) {
      this.selectedCustomerName$ = this.customerHttpService.getCustomerNameById(selectedCustomerId);
    }
  }
  /**
   * @konstantinosporo
   * @description Triggered after confirming the action modal. Method to create a new BookApi object, and adding it
   *  in the API endpoint. It also uses alert service and global error service for outputing success and, error messages.
   */
  confirmCreation() {
    //console.log(this.reservationFormControl.value);
    // console.log(this.reservationFormControl.controls['name']);
    if (this.reservationFormControl.valid) {
      const newReservation: ReservationApi = {
        bookId: this.reservationFormControl.controls['bookId'].value as string,
        customerId: this.reservationFormControl.controls['customerId'].value as string,
        returnBy: this.reservationFormControl.controls['returnBy'].value
          ? new Date(this.reservationFormControl.controls['returnBy'].value).toISOString()
          : new Date().toISOString(),
      };
      //console.table(newReservation);
      // Also catching the scenario where a book was available when the reservation started but was 
      // reserved before clicking the reserve button, as i only fetch available books.
      this.bookHttpService.getBookById(newReservation.bookId as string)
        .pipe(
          tap(book => {
            if (!book.available) {
              //console.log(!book.available);
              throw new Error('Book is already reserved');
            }
          }),
          switchMap(() => this.reservationService.addReservation(newReservation)),
          takeUntil(this.destroy$),
        )
        .subscribe({
          next: (reservation: ReservationApi) => {
            this.alertService.showSuccessToast(`Reservation with ID: ${reservation._id} successfully created!`);
            this.router.navigate(['reservations']);
          },
          error: (err) => {
            //console.error('Error creating reservation!', err);
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
