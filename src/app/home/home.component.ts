import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CarouselComponent } from '../shared/carousel/carousel.component';
import { CtaButtonComponent } from '../shared/buttons/cta-button/cta-button.component';
import { FeatureItemComponent } from '../shared/feature-item/feature-item.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ChartGaugeComponent } from "./charts/chart-gauge/chart-gauge.component";
import { CustomerHttpService } from '../services/customers/customer-http.service';
import { Observable } from 'rxjs';
import { CustomerApi } from '../customers/customer';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { ReservationApi } from '../reservations/reservation';
import { ReservationHttpService } from '../services/reservations/reservation-http.service';
import { ThemeService } from '../services/theme.service';
import { ApiStatus, HealthCheckService } from '../services/api-health/health-check.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FeatureItemComponent, CtaButtonComponent, CarouselComponent, RouterOutlet, RouterLink, RouterLinkActive, ChartGaugeComponent, AsyncPipe, SpinnerComponent],
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

  carouselImages = [
    { src: '/home/carousel/home-carousel1.webp', alt: 'Library Image 1' },
    { src: '/home/carousel/home-carousel2.jpeg', alt: 'Library Image 2' },
    { src: '/home/carousel/home-carousel3.webp', alt: 'Library Image 3' }
  ];

  features = [
    {
      title: 'Online Reservations',
      description: 'Reserve books online and pick them up at your convenience.',
      imageSrc: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Community Events',
      description: 'Join our reading clubs and author meetups.',
      imageSrc: 'https://images.pexels.com/photos/2090104/pexels-photo-2090104.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  onExploreClick() {
    console.log('Explore button clicked')
  }

}
