import { Component } from '@angular/core';
import { CustomerService } from '../services/customers/customer.service';
import { Observable } from 'rxjs';
import { CustomerApi } from './customer';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  customerStream$!: Observable<CustomerApi[]>;

  constructor(private readonly customerHttpService: CustomerService) {
    this.customerStream$ = this.customerHttpService.getReservations();
  }

  handleClick(id: string, action: string) {
    console.log(id);
    // TODO ADD THE LOGIC FOR BUTTON CLICKS CAN USE SWITCH TO ALSO GET SWITCH FUNCTIONALITIES
    switch (action) {
      case 'view':
        console.log('I have clicked the view button');
        break;
      case 'edit':
        console.log('I have clicked the edit button');
        break;
      case 'delete':
        console.log('I have clicked the delete button');
        break;
      default: break;
    }
  }

  // or make three diffrent methods
}
