import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { CrudActions } from '../_lib/interfaces';
import { AlertService } from '../services/alert-handlers/alert.service';
import { CustomerHttpService } from '../services/customers/customer-http.service';
import { CustomerApi } from './customer';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { AddNewButtonComponent } from "../shared/buttons/add-new-button/add-new-button.component";
import { Router } from '@angular/router';
import { RefreshPageButtonComponent } from "../shared/buttons/refresh-page-button/refresh-page-button.component";
import { ThemeService } from '../services/theme/theme.service';
import { SearchComponent } from "../shared/search/search.component";
import { ActionsDropdownComponent } from "../shared/buttons/actions-dropdown/actions-dropdown.component";
import { DropdownActions } from '../shared/buttons/actions-dropdown/dropdown';
import { SearchStateService } from '../services/search-state.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AsyncPipe, SpinnerComponent, AddNewButtonComponent, RefreshPageButtonComponent, NgClass, SearchComponent, ActionsDropdownComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements CrudActions, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly allCustomers$!: Observable<CustomerApi[]>;
  customers$!: Observable<CustomerApi[]>;
  isDarkTheme!: boolean;
  searchQueryState$!: Observable<string>;
  dropdownActions: DropdownActions[] = [
    { id: 'asc', title: 'Ascending Name', icon: 'bi bi-arrow-up' },
    { id: 'desc', title: 'Descending Name', icon: 'bi bi-arrow-down' },
    { id: 'asc-email', title: 'Ascending Email', icon: 'bi bi-arrow-up' },
    { id: 'desc-email', title: 'Descending Email', icon: 'bi bi-arrow-down' },
  ]
  constructor(
    private readonly customerHttpService: CustomerHttpService,
    private readonly searchStateService: SearchStateService,
    private readonly alertService: AlertService,
    private readonly themeService: ThemeService,
    private readonly router: Router,

  ) {
    this.allCustomers$ = this.customerHttpService.getCustomers();
    this.customers$ = this.allCustomers$;
    this.themeService.isDarkThemeStream$.subscribe(isDarkTheme => this.isDarkTheme = isDarkTheme);
    this.searchQueryState$ = this.searchStateService.searchStream$;
    this.searchQueryState$
      .pipe(takeUntil(this.destroy$), filter((searchQuery: string) => searchQuery.length >= 0))
      .subscribe((data) => {
        this.fetchFilteredCustomers(data);
      });
  }
  // Navigate to the specified route to add a new record.
  add(route: string) {
    this.router.navigate([route]);
  }
  // Navigate to customers view page on click.
  view(id: string) {
    this.router.navigate([`customer/${id}/view`]);
  }
  // Navigate to customers edit page on click.
  edit(id: string) {
    this.router.navigate([`customer/${id}/edit`]);
  }
  // Initiate delete confirmation modal.
  delete(id: string) {
    //console.log(id);
    this.alertService.showDangerModal('Confirm Deletion', `Are you sure you want to delete customer with ID: ${id}`, () => this.confirmDelete(id), 'Delete Customer');
  }
  /**
   * @konstantinosporo
   * @description Simple refresh function that basically reemits the getCustomers() stream in the local observable.
   */
  refreshCustomers() {
    this.customers$ = this.customerHttpService.getCustomers();
  }
  /**
   * @konstantinosporo
   * @description
   * Handle child events (DropdownButtonComponent)
   * @param id 
   */
  getClickedDropdownId(id: string) {
    //console.log(id + '' + 'from father comp');
    switch (id) {
      case ('asc'):
        this.fetchFilteredAscByName();
        break;
      case ('desc'):
        this.fetchFilteredDescByName();
        break;
      case ('asc-email'):
        this.fetchFilteredAscByEmail();
        break;
      case ('desc-email'):
        this.fetchFilteredDescByEmail();
        break;
      default: break;
    }
  }
  /**
  * @konstantinosporo
  * @description
  * Actively filters the api for close matxhes of the searched query string.
  * Accepts a text string as a param.
  */
  fetchFilteredCustomers(text: string) {
    if (text.length === 0) {
      this.customers$ = this.allCustomers$;
    } else {
      this.customers$ = this.allCustomers$.pipe(
        map((customer) =>
          customer.filter((customer) => {
            const customerName = customer.name.toLowerCase() || '';
            const customerSurname = customer.surname.toLowerCase() || '';
            const customerEmail = customer.email.toLowerCase() || '';
            const customerPhone = customer.phoneNumber.toLowerCase() || '';
            const searchText = text.toLowerCase();

            return (
              customerName.includes(searchText) ||
              customerSurname.includes(searchText) ||
              customerName.includes(searchText) ||
              customerEmail.includes(searchText) ||
              customerPhone.includes(searchText)
            );
          })
        )
      );
    }
  }
  /**
 * @konstantinosporo
 * @description
 * Filter customer in ascending order by customer name.
 */
  fetchFilteredAscByName() {
    this.customers$ = this.allCustomers$.pipe(
      map((customers) =>
        customers.slice().sort((a, b) => {
          const nameA = (a.name ?? '').toLowerCase();
          const nameB = (b.name ?? '').toLowerCase();
          return nameA.localeCompare(nameB); // Ascending order
        })
      )
    );
  }
  /**
   * @konstantinosporo
   * @description
   * Filter customer in descending order by customer name.
   */
  fetchFilteredDescByName() {
    this.customers$ = this.allCustomers$.pipe(
      map((customers) =>
        customers.slice().sort((a, b) => {
          const nameA = (a.name ?? '').toLowerCase();
          const nameB = (b.name ?? '').toLowerCase();
          return nameB.localeCompare(nameA); // Descending order
        })
      )
    );
  }
  /**
   * @konstantinosporo
   * @description
   * Filter customers in descending order by customer email.
   */
  fetchFilteredAscByEmail() {
    this.customers$ = this.allCustomers$.pipe(
      map((customers) =>
        customers.slice().sort((a, b) => {
          const emailA = (a.email ?? '').toLowerCase();
          const emailB = (b.email ?? '').toLowerCase();
          return emailA.localeCompare(emailB); // Ascending order
        })
      )
    );
  }
  /**
   * @konstantinosporo
   * @description
   * Filter customer in descending order by customer email.
   */
  fetchFilteredDescByEmail() {
    this.customers$ = this.allCustomers$.pipe(
      map((customers) =>
        customers.slice().sort((a, b) => {
          const emailA = (a.email ?? '').toLowerCase();
          const emailB = (b.email ?? '').toLowerCase();
          return emailB.localeCompare(emailA); // Descending order
        })
      )
    );
  }
  /**
   * @konstantinosporo
   * @description After the confirmation of the modal, this method is triggered that tries to connect and delete the record from the API.
   * @param id 
   */
  confirmDelete(id: string) {
    this.customerHttpService.deleteCustomerById(id).subscribe({
      next: (user: CustomerApi) => {
        //console.log(`User ${user.name} with id: ${user._id} has been deleted.`);
        this.alertService.showSuccessToast(`Customer with ID: ${id} successfully deleted!`);
        this.customers$ = this.customerHttpService.getCustomers(); // update the data stream!
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
  /**
   * @konstantinosporo
   * @description Catching the ng destroy hook to terminate subsriptions on destroy.
   */
  ngOnDestroy() {
    this.searchStateService.resetSearch();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
