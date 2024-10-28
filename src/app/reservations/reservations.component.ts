import { Component } from '@angular/core';
import { ReservationHttpService } from '../services/reservations/reservation-http.service';
import { Observable } from 'rxjs';
import { ReservationApi } from './reservation';
import { AsyncPipe, DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { CrudActions } from '../_lib/interfaces';
import { SpinnerComponent } from "../shared/spinner/spinner.component";

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgClass, UpperCasePipe, SpinnerComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements CrudActions {

  dataStream$!: Observable<ReservationApi[]>;

  constructor(private readonly reservationHttpService: ReservationHttpService) {
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
