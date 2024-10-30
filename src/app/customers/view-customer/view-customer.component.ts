import { Component } from '@angular/core';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { CustomerApi } from '../customer';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { ActivatedRoute } from '@angular/router';
import { CustomerHttpService } from '../../services/customers/customer-http.service';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [BasicWrapperComponent, ReactiveFormsModule, NgClass, SpinnerComponent, AsyncPipe],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent {
  customerId: string = '';
  backButton: { title: string, route: string } = { title: 'Back to Customers', route: '/customers' };
  customerToView$!: Observable<CustomerApi>;

  constructor(
    private readonly customerHttpService: CustomerHttpService,
    private readonly route: ActivatedRoute
  ) {
    this.route.params.subscribe(param => this.customerId = param['id'] || '');
    if (this.customerId.length) {
      //console.log(this.customerId);
      this.customerToView$ = this.customerHttpService.getCustomerById(this.customerId);
    }
  }
}
