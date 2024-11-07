import { Routes } from '@angular/router';
import { AddBookComponent } from './books/add-book/add-book.component';
import { BooksComponent } from './books/books.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { ViewBookComponent } from './books/view-book/view-book.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { HeatmapComponent } from './home/dashboard/heatmap/heatmap.component';
import { HomeComponent } from './home/home.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { QuickSettingsComponent } from './home/dashboard/quick-settings/quick-settings.component';

export const routes: Routes = [
  // HOME ROUTE
  {
    path: '',
    component: HomeComponent,
    title: 'BookWave',
    children: [
      // default child for home page
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: QuickSettingsComponent, title: 'Dashboard | BookWave' },
      { path: 'dashboard/heatmap', component: HeatmapComponent, title: 'Sales HeatMap | BookWave' },
    ],
  },
  // BOOKS ROUTES
  { path: 'books', component: BooksComponent, title: 'Books | BookWave' },
  { path: 'book/add', component: AddBookComponent, title: 'Add Book | BookWave' },
  { path: 'book/:id/edit', component: EditBookComponent, title: 'Edit Book | BookWave' },
  { path: 'book/:id/view', component: ViewBookComponent, title: 'View Book | BookWave' },
  // RESERVATION ROUTES
  { path: 'reservations', component: ReservationsComponent, title: 'Reservations | BookWave' },
  { path: 'reservation/add', component: AddReservationComponent, title: 'Add Reservation | BookWave' },
  { path: 'reservation/:id/add', component: AddReservationComponent, title: 'Add Reservation | BookWave' },
  // CUSTOMERS ROUTES
  { path: 'customers', component: CustomersComponent, title: 'Customers | BookWave' },
  { path: 'customer/add', component: AddCustomerComponent, title: 'Add Customer | BookWave' },
  { path: 'customer/:id/edit', component: EditCustomerComponent, title: 'Edit Customer | BookWave' },
  { path: 'customer/:id/view', component: ViewCustomerComponent, title: 'View Customer | BookWave' },







];
