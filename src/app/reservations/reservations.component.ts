import { AsyncPipe, DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudActions } from '../_lib/interfaces';
import { AlertService } from '../services/alert-handlers/alert.service';
import { ReservationHttpService } from '../services/reservations/reservation-http.service';
import { AddNewButtonComponent } from "../shared/buttons/add-new-button/add-new-button.component";
import { RefreshPageButtonComponent } from "../shared/buttons/refresh-page-button/refresh-page-button.component";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { ReservationApi, Status } from './reservation';
import { ThemeService } from '../services/theme/theme.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgClass, UpperCasePipe, SpinnerComponent, RefreshPageButtonComponent, AddNewButtonComponent,],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements CrudActions {
  status!: Status;
  dataStream$!: Observable<ReservationApi[]>;
  isDarkTheme!: boolean;

  constructor(
    private readonly reservationHttpService: ReservationHttpService,
    private readonly alertService: AlertService,
    private readonly themeService: ThemeService,
    private readonly router: Router,

  ) {
    this.dataStream$ = this.reservationHttpService.getReservations();
    this.themeService.isDarkThemeStream$.subscribe(isDarkTheme => this.isDarkTheme = isDarkTheme);
  }
  // Check in CrudAction interface for more information app > lib > interfaces.ts
  add(route: string) {
    //console.log(route);
    this.router.navigate([route]);
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

  refreshCustomers() {
    this.dataStream$ = this.reservationHttpService.getReservations();
  }
  /**
   * @konstantinosporo
   * @description Same procedure as Books and Reservations
   */
  complete(id: string) {
    this.alertService.showDangerModal('Confirm Completion', `Are you sure you want to complete this reservation?
      Reservation Id: ${id}`, () => this.confirmCompletion(id), "Complete Reservation");
  }
  confirmCompletion(id: string) {
    //console.log(this.reservationFormControl.value);
    // console.log(this.reservationFormControl.controls['name']);
    if (id) {
      //console.table(newBook);
      this.reservationHttpService.completeReservation(id).subscribe({
        next: (reservation: ReservationApi) => {
          this.alertService.showSuccessToast(`Reservation with ID: ${reservation._id} successfully completed!`);
          this.dataStream$ = this.reservationHttpService.getReservations();

        },
        error: (err) => {
          console.error('Error completing reservation!', err);
          if (err instanceof Error) {
            throw new Error(`Error completing reservation! ${err.message}`);
          } else {
            throw new Error('Error completing reservation!');
          }
        }
      });
    }
  }


}
