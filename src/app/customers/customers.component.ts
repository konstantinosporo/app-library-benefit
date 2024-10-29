import { AsyncPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudActions } from '../_lib/interfaces';
import { AlertService } from '../services/alert-handlers/alert.service';
import { CustomerHttpService } from '../services/customers/customer-http.service';
import { CustomerApi } from './customer';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { AddNewButtonComponent } from "../shared/buttons/add-new-button/add-new-button.component";
import { Router } from '@angular/router';
import { RefreshPageButtonComponent } from "../shared/buttons/refresh-page-button/refresh-page-button.component";
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AsyncPipe, SpinnerComponent, AddNewButtonComponent, RefreshPageButtonComponent, NgClass],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements CrudActions {
  dataStream$!: Observable<CustomerApi[]>;
  isDarkTheme!: boolean;
  constructor(
    private readonly customerHttpService: CustomerHttpService,
    private readonly alertService: AlertService,
    private readonly router: Router,
    private readonly themeService: ThemeService,

  ) {
    this.dataStream$ = this.customerHttpService.getCustomers();
    this.themeService.isDarkThemeStream$.subscribe(isDarkTheme => this.isDarkTheme = isDarkTheme);
  }
  // TODO IMPLEMENT CUSTOMERS VIEW AND EDIT 
  view(id: string) {
    console.log(id)
  }
  edit(id: string) {
    console.log(id)
  }
  delete(id: string) {
    //console.log(id);
    this.alertService.showDangerModal('Confirm Deletion', `Are you sure you want to delete customer with ID: ${id}`, () => this.confirmDelete(id), 'Delete Customer');
  }

  confirmDelete(id: string) {
    this.customerHttpService.deleteCustomerById(id).subscribe({
      next: (user: CustomerApi) => {
        //console.log(`User ${user.name} with id: ${user._id} has been deleted.`);
        this.alertService.showSuccessToast(`Customer with ID: ${user._id} successfully deleted!`);
        this.dataStream$ = this.customerHttpService.getCustomers(); // update the data stream!
        // this.alertService.showSuccessToast(`Customer with ID: ${user._id} successfully deleted!`);
        // this.mockDataStream$ = this.customerHttpService.getCustomers(); // Refetch the data stream
      },
      error: (err) => {
        if (err instanceof Error) {
          throw new Error(`Error deleting user: ${err.message}`)
        } else throw new Error('Error deleting user.');
      }
    });
  }

  addNewCustomer(route: string) {
    this.router.navigate([route]);
  }

  refreshCustomers() {
    this.dataStream$ = this.customerHttpService.getCustomers();
  }

}
