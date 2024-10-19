import { Component } from '@angular/core';
import { ReservationService } from '../services/reservations/reservation.service';
import { Observable } from 'rxjs';
import { ReservationApi } from './reservation';
import { AsyncPipe, DatePipe, NgClass, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgClass, UpperCasePipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  reservationStream$!: Observable<ReservationApi[]>;

  constructor(private readonly reservationHttpService: ReservationService) {
    this.reservationStream$ = this.reservationHttpService.getReservations();
   }
  
}
