import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerApi } from '../customers/customer';
import { ReservationApi } from '../reservations/reservation';
import { ApiStatus, HealthCheckService } from '../services/api-health/health-check.service';
import { CustomerHttpService } from '../services/customers/customer-http.service';
import { ReservationHttpService } from '../services/reservations/reservation-http.service';
import { ThemeService } from '../services/theme/theme.service';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { ChartGaugeComponent } from "./charts/chart-gauge/chart-gauge.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ChartGaugeComponent, AsyncPipe, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isDarkTheme!: boolean;
  customers$!: Observable<CustomerApi[]>;
  reservations$!: Observable<ReservationApi[]>;
  apiStatuses$!: Observable<ApiStatus[]>;

  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly customerService: CustomerHttpService,
    private readonly reservationService: ReservationHttpService,
    private readonly themeService: ThemeService,

  ) {
    this.reservations$ = this.reservationService.getReservations();
    this.customers$ = this.customerService.getCustomers();
    this.themeService.isDarkThemeStream$.subscribe(isDarkTheme => this.isDarkTheme = isDarkTheme);
    this.apiStatuses$ = this.healthCheckService.checkApiStatus();
  }

}
