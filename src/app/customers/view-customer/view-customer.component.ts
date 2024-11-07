import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CustomerHttpService } from '../../services/customers/customer-http.service';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { CustomerApi } from '../customer';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [BasicWrapperComponent, ReactiveFormsModule, NgClass, SpinnerComponent, AsyncPipe],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  customerId: string = '';
  backButton: { title: string, route: string } = { title: 'Back', route: '/customers' };
  customerToView$!: Observable<CustomerApi>;
  /**
   * @konstantinosporo
   * @description
   * Constructor that injects required services and initializes the component.
   * Subscribes to the route parameters to get the customer ID and fetches the customer data if ID exists.
   */
  constructor(
    private readonly customerHttpService: CustomerHttpService,
    private readonly route: ActivatedRoute
  ) {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(param => this.customerId = param['id'] || '');
    if (this.customerId.length) {
      //console.log(this.customerId);
      this.customerToView$ = this.customerHttpService.getCustomerById(this.customerId);
    }
  }
  /**
  * @konstantinosporo
  * @description Catching the ng destroy hook to terminate subsriptions on destroy.
  */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
