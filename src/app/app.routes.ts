import { Routes } from '@angular/router';
import { AddBookComponent } from './books/add-book/add-book.component';
import { BooksComponent } from './books/books.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { ViewBookComponent } from './books/view-book/view-book.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';

export const routes: Routes = [
  // HOME ROUTE
  { path: '', component: HomeComponent, title: 'Home | AppLibrary' },
  // BOOKS ROUTES
  { path: 'books', component: BooksComponent, title: 'Books | AppLibrary' },
  { path: 'books/add-book', component: AddBookComponent, title: 'Add Book | AppLibrary' },
  { path: 'book/:id/edit-book', component: EditBookComponent, title: 'Edit Book | AppLibrary' },
  { path: 'book/:id/view-book', component: ViewBookComponent, title: 'View Book | AppLibrary' },
  // RESERVATION ROUTES
  { path: 'reservations', component: ReservationsComponent, title: 'Reservations | AppLibrary' },
  { path: 'reservations/add-reservation', component: AddReservationComponent, title: 'Add Reservation | AppLibrary' },


  // CUSTOMERS ROUTES
  { path: 'customers', component: CustomersComponent, title: 'Customers | AppLibrary' },
  { path: 'customers/add-customer', component: AddCustomerComponent, title: 'Add Customer | AppLibrary' },


];
