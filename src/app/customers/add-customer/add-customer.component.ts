import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerHttpService } from '../../services/customers/customer-http.service';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { NgClass } from '@angular/common';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { CustomerApi } from '../customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, BasicWrapperComponent, NgClass],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  customerFormControl!: FormGroup;
  backButton: { title: string, route: string } = { title: 'Back to Customers', route: '/customers' };

  constructor(
    private readonly customerHttpService: CustomerHttpService,
    private readonly alertService: AlertService,
    private readonly router: Router,
  ) {
    this.customerFormControl = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),

    })
  }

  addCustomer() {
    //console.log(id);
    this.alertService.showSuccessModal('Confirm Creation', `Are you sure you want to create customer with fullname: ${this.customerFormControl.controls['name'].value} ${this.customerFormControl.controls['surname'].value}`, () => this.confirmCreation(), "Add Customer");
  }

  /**
   * @konstantinosporo
   * @description Triggered after confirming the action modal. Method to create a new BookApi object, and adding it
   *  in the API endpoint. It also uses alert service and global error service for outputing success and, error messages.
   */
  confirmCreation() {
    //console.log(this.customerFormControl.value);
    // console.log(this.customerFormControl.controls['name']);
    if (this.customerFormControl.valid) {
      const newCustomer: CustomerApi = {
        name: this.customerFormControl.controls['name'].value as string,
        surname: this.customerFormControl.controls['surname'].value as string,
        email: this.customerFormControl.controls['email'].value as string,
        phoneNumber: this.customerFormControl.controls['phoneNumber'].value as string,
      };
      //console.table(newBook);
      this.customerHttpService.addCustomer(newCustomer).subscribe({
        next: (customer: CustomerApi) => {
          this.alertService.showSuccessToast(`Customer with ID: ${customer._id} successfully created!`);
          setTimeout(() => {
            this.router.navigate(['customers']);
          }, 1000);
        },
        error: (err) => {
          console.error('Error creating customer:', err);
          if (err instanceof Error) {
            throw new Error(`Error creating customer: ${err.message}`);
          } else {
            throw new Error('Error creating customer.');
          }
        }
      });
    }
  }
}