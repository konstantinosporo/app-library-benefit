import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { LibraryComponent } from './library/library.component';

export const routes: Routes = [
  // TODO Add Guards for protected routes.
  { path: 'login-form', component: LoginFormComponent, title:'Login | AppLibrary' },
  { path: 'register-form', component: RegisterFormComponent, title:'Register | AppLibrary'  },

  { path: 'library', component: LibraryComponent, title:'Library | AppLibrary'}
];
