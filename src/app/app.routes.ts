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
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { TestChartComponent } from './home/charts/test-chart/test-chart.component';
import { TestChart2Component } from './home/charts/test-chart2/test-chart2.component';

export const routes: Routes = [
  // HOME ROUTE
  {
    path: '', component: HomeComponent, title: 'Home | AppLibrary', children:
      [
        { path: 'chart1', component: TestChartComponent, title: 'Chart1 | AppLibary' },
        { path: 'chart2', component: TestChart2Component, title: 'Chart2 | AppLibary' },
      ],
  },
  // BOOKS ROUTES
  { path: 'books', component: BooksComponent, title: 'Books | AppLibrary' },
  { path: 'book/add', component: AddBookComponent, title: 'Add Book | AppLibrary' },
  { path: 'book/:id/edit', component: EditBookComponent, title: 'Edit Book | AppLibrary' },
  { path: 'book/:id/view', component: ViewBookComponent, title: 'View Book | AppLibrary' },
  // RESERVATION ROUTES
  { path: 'reservations', component: ReservationsComponent, title: 'Reservations | AppLibrary' },
  { path: 'reservation/add', component: AddReservationComponent, title: 'Add Reservation | AppLibrary' },
  // CUSTOMERS ROUTES
  { path: 'customers', component: CustomersComponent, title: 'Customers | AppLibrary' },
  { path: 'customer/add', component: AddCustomerComponent, title: 'Add Customer | AppLibrary' },
  { path: 'customer/:id/edit', component: EditCustomerComponent, title: 'Edit Customer | AppLibrary' },
  { path: 'customer/:id/view', component: ViewCustomerComponent, title: 'View Customer | AppLibrary' },







];
