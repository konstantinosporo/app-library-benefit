import { Component } from '@angular/core';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { CustomerApi } from '../customer';
import { CustomerHttpService } from '../../services/customers/customer-http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [BasicWrapperComponent, ReactiveFormsModule, NgClass],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent {
  backButton: { title: string, route: string } = { title: 'Back to Customers', route: '/customers' };
  customerFormControl!: FormGroup;
  paramId!: string;
  titleFooter!: string;
  constructor(
    private readonly customerHttpService: CustomerHttpService,
    private readonly alertService: AlertService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,

  ) {
    this.customerFormControl = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.route.params.subscribe(param => {
      this.customerHttpService.getCustomerById(param['id']).subscribe((customer) => {
        this.patchForm(customer);
      });
      this.paramId = param['id'];
      this.titleFooter = `Editing customer with ID:`;
    });
  }

  editCustomer() {
    this.alertService.showInfoModal('Confirm Changes', `Are you sure you want to edit customer: ${this.customerFormControl.controls['name'].value} ${this.customerFormControl.controls['surname'].value}`, () => this.confirmEdit(), "Edit Customer");
  }
  confirmEdit() {
    //console.log(this.customerFormControl.value);
    // console.log(this.customerFormControl.controls['name']);
    if (this.customerFormControl.valid) {
      const editedCustomer: CustomerApi = {
        _id: this.paramId,
        name: this.customerFormControl.controls['name'].value as string,
        surname: this.customerFormControl.controls['surname'].value as string,
        email: this.customerFormControl.controls['email'].value as string,
        phoneNumber: this.customerFormControl.controls['phoneNumber'].value as string,
      };
      //console.table(newBook);
      this.customerHttpService.editCustomer(editedCustomer).subscribe({
        next: (customer: CustomerApi) => {
          this.alertService.showSuccessToast(`Customer with ID: ${customer._id} successfully edited!`);
          this.router.navigate(['customers']);
        },
        error: (err) => {
          //console.error('Error editing book:', err); 
          if (err instanceof Error) {
            throw new Error(`Error editing customer: ${err.message}`);
          } else {
            throw new Error('Error editing customer.', err);
          }
        }
      });
    }
  }
  patchForm(customer: CustomerApi) {
    this.customerFormControl.patchValue({
      name: customer.name,
      surname: customer.surname,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
    });
  }
}
