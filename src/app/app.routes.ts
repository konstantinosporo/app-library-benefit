import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { LibraryComponent } from './library/library.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { HomeComponent } from './home/home.component';
import { AddBookComponent } from './library/add-book/add-book.component';
import { ViewBookComponent } from './library/view-book/view-book.component';

export const routes: Routes = [

  { path: '', component: HomeComponent, title: 'Home | AppLibrary' },
  { path: 'library', component: LibraryComponent, title: 'Library | AppLibrary' },
  { path: 'reservations', component: ReservationsComponent, title: 'Reservations | AppLibrary' },
  { path: 'customers', component: CustomersComponent, title: 'Customers | AppLibrary' },

  { path: 'library/add-book', component: AddBookComponent, title: 'Add Book | AppLibrary' },
  { path: 'library/view-book/:id', component: ViewBookComponent, title: 'View Book | AppLibrary' },

  // <!-- @konstantinosporo -->
  // <!-- For now the forms are not needed. If the project doesnt contain login/register logic this code WILL be deleted. -->
  // { path: 'login-form', component: LoginFormComponent, title:'Login | AppLibrary' },
  // { path: 'register-form', component: RegisterFormComponent, title:'Register | AppLibrary'  },

];
