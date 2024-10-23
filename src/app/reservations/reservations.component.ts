import { Component } from '@angular/core';
import { ReservationService } from '../services/reservations/reservation.service';
import { Observable } from 'rxjs';
import { ReservationApi } from './reservation';
import { AsyncPipe, DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { CrudActions } from '../_lib/interfaces';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgClass, UpperCasePipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements CrudActions {

  dataStream$!: Observable<ReservationApi[]>;

  constructor(private readonly reservationHttpService: ReservationService) {
    this.dataStream$ = this.reservationHttpService.getReservations();
  }

  view(id: string) {
    console.log(id);
  }

  edit(id: string) {
    console.log(id);
  }

  delete(id: string) {
    console.log(id);
  }

}
