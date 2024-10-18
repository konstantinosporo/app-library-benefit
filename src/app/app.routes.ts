import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CustomersComponent } from './customers/customers.component';

export const routes: Routes = [
  
  { path: '', component: HomeComponent, title: 'Home | AppLibrary' },
  { path: 'library', component: LibraryComponent, title:'Library | AppLibrary'},
  { path: 'customers', component: ReservationsComponent, title:'Customers | AppLibrary'},
  { path: 'reservations', component: CustomersComponent, title:'Reservations | AppLibrary'},

  // <!-- @konstantinosporo -->
  // <!-- For now the forms are not needed. If the project doesnt contain login/register logic this code WILL be deleted. -->
  // { path: 'login-form', component: LoginFormComponent, title:'Login | AppLibrary' },
  // { path: 'register-form', component: RegisterFormComponent, title:'Register | AppLibrary'  },

];
