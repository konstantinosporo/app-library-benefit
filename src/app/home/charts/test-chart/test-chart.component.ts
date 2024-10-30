import { Component, OnInit } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { CustomerHttpService } from '../../../services/customers/customer-http.service';
import { map, Observable } from 'rxjs';
import { BookApi } from '../../../books/book/book';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";

@Component({
  selector: 'app-test-chart',
  standalone: true,
  imports: [NgxEchartsDirective, SpinnerComponent],
  templateUrl: './test-chart.component.html',
  styleUrl: './test-chart.component.css'
})
export class TestChartComponent implements OnInit {
  options!: EChartsOption;
  customers$!: Observable<BookApi[]>;
  constructor(private readonly customerService: CustomerHttpService) { }

  ngOnInit(): void {
    this.customerService.getCustomers().pipe(
      map(customers => customers.map(customer => ({
        value: 1, // or another relevant count/metric related to each customer
        name: `${customer.name} ${customer.surname}` // Display customer's full name
      })))
    ).subscribe(data => {
      this.options = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Status',
            type: 'gauge',
            progress: {
              show: true
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}'
            },
            data: [
              {
                value: data.length,
                name: 'Active Users'
              }
            ]
          }
        ]
      };
    });
  }
}