import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { CustomerHttpService } from '../../services/customers/customer-http.service';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { CustomerApi } from '../customer';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, BasicWrapperComponent, NgClass],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  customerFormControl!: FormGroup;
  backButton: { title: string, route: string } = { title: 'Back', route: '/customers' };

  constructor(
    private readonly customerHttpService: CustomerHttpService,
    private readonly alertService: AlertService,
    private readonly router: Router,
  ) {
    this.customerFormControl = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]),

    })
  }
  /**
   * @konstantinosporo
   * @description Initiates the confirmation modal which can initiate the confirmCreation() method.
   */
  addCustomer() {
    //console.log(id);
    this.alertService.showSuccessModal('Confirm Creation', `Are you sure you want to upload customer: ${this.customerFormControl.controls['name'].value} ${this.customerFormControl.controls['surname'].value}?`, () => this.confirmCreation(), "Save");
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
          this.alertService.showSuccessToast(`Customer with ID: ${customer._id} was successfully uploaded!`);
          this.router.navigate(['customers']);
        },
        error: (err: HttpErrorResponse) => {
          //console.log(err); // the most possible scenario is to throw an httpresponse

          let errorMessage = 'An unknown error occurred';

          // check for duplicate key
          if (err.error?.message?.includes('E11000 duplicate key error') && err.error.message.includes('email')) {
            errorMessage = 'Email already exists!';
          } else if (err.error?.message) {
            // uknown error 
            errorMessage = err.error.message;
          }

          this.alertService.showDangerToast(errorMessage);

          //console.error('Error creating customer:', errorMessage);
        }
      });

    }
  }
}
