import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudActions } from '../_lib/interfaces';
import { AlertService } from '../services/alert-handlers/alert.service';
import { CustomerService } from '../services/customers/customer.service';
import { CustomerApi } from './customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements CrudActions {
  //TODO Change the actual data to target the projects api!
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
    //console.log(id);
    this.alertService.showVerificationModal('Confirm Deletion', `Are you sure you want to delete record with ID: ${id}`, () => this.confirmDelete(id));
  }

  confirmDelete(id: string) {
    this.customerHttpService.deleteMockCustomer(id).subscribe({
      next: (user: CustomerApi) => {
        //console.log(`User ${user.name} with id: ${user._id} has been deleted.`);
        this.alertService.showSuccess(`Customer with ID: ${user._id} successfully deleted!`);
        this.mockDataStream$ = this.customerHttpService.getMockCustomers(); // update the data stream!
      },
      error: (err) => {
        if (err instanceof Error) {
          throw new Error(`Error deleting user: ${err.message}`)
        } else throw new Error('Error deleting user.');
      }
    });
  }

}
