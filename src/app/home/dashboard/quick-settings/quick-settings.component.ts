import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerApi } from '../../../customers/customer';
import { ReservationApi } from '../../../reservations/reservation';
import { CustomerHttpService } from '../../../services/customers/customer-http.service';
import { ReservationHttpService } from '../../../services/reservations/reservation-http.service';
import { ThemeService } from '../../../services/theme/theme.service';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { ChartGaugeComponent } from '../../charts/chart-gauge/chart-gauge.component';

@Component({
  selector: 'app-quick-settings',
  standalone: true,
  imports: [ChartGaugeComponent, AsyncPipe, SpinnerComponent],
  templateUrl: './quick-settings.component.html',
  styleUrl: './quick-settings.component.css'
})
export class QuickSettingsComponent {
  isDarkTheme!: boolean;
  customers$!: Observable<CustomerApi[]>;
  reservations$!: Observable<ReservationApi[]>;

  constructor(
    private readonly customerService: CustomerHttpService,
    private readonly reservationService: ReservationHttpService,
    private readonly themeService: ThemeService,

  ) {
    this.reservations$ = this.reservationService.getReservations();
    this.customers$ = this.customerService.getCustomers();
    this.themeService.isDarkThemeStream$.subscribe(isDarkTheme => this.isDarkTheme = isDarkTheme);
  }


}
