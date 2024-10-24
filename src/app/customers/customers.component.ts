import { Component } from '@angular/core';
import { CustomerService } from '../services/customers/customer.service';
import { Observable } from 'rxjs';
import { CustomerApi } from './customer';
import { AsyncPipe } from '@angular/common';
import { CrudActions } from '../_lib/interfaces';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert-handlers/alert.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements CrudActions {

  //dataStream$!: Observable<CustomerApi[]>;
  mockDataStream$!: Observable<CustomerApi[]>;

  constructor(private readonly customerHttpService: CustomerService, private readonly alertService: AlertService) {
    //this.dataStream$ = this.customerHttpService.getCustomers();
    this.mockDataStream$ = this.customerHttpService.getMockCustomers();
  }

  view(id: string) {
    console.log(id)
  }
  edit(id: string) {
    console.log(id)
  }
  delete(id: string) {
    this.customerHttpService.deleteMockCustomer(id).subscribe({
      next: (user: CustomerApi) => {
        //console.log(`User ${user.name} with id: ${user._id} has been deleted.`);
        this.alertService.showSuccess(`Customer with ID: ${user._id} successfully deleted!`);
        this.mockDataStream$ = this.customerHttpService.getMockCustomers(); // Refetch the data stream
      },
      error: (err) => {
        if (err instanceof Error) {
          throw new Error(`Error deleting user: ${err.message}`)
        } else throw new Error('Error deleting user.');
      }
    });
  }

}
