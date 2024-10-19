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
  
  handleClick(id: string, action: string) {
    console.log(id);
    // TODO ADD THE LOGIC FOR BUTTON CLICKS CAN USE SWITCH TO ALSO GET SWITCH FUNCTIONALITIES
    switch (action) {
      case 'view':
        console.log('I have clicked the view button');
        break;
      case 'edit':
        console.log('I have clicked the edit button');
        break;
      case 'delete':
        console.log('I have clicked the delete button');
        break;
      default: break;
    }
  }
  
}
