import { AsyncPipe, DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { CrudActions } from '../_lib/interfaces';
import { AlertService } from '../services/alert-handlers/alert.service';
import { ReservationHttpService } from '../services/reservations/reservation-http.service';
import { AddNewButtonComponent } from "../shared/buttons/add-new-button/add-new-button.component";
import { RefreshPageButtonComponent } from "../shared/buttons/refresh-page-button/refresh-page-button.component";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { ReservationApi, Status } from './reservation';
import { ThemeService } from '../services/theme/theme.service';
import { SearchComponent } from "../shared/search/search.component";
import { SearchStateService } from '../services/search-state.service';
import { ActionsDropdownComponent } from "../shared/buttons/actions-dropdown/actions-dropdown.component";
import { DropdownActions } from '../shared/buttons/actions-dropdown/dropdown';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgClass, UpperCasePipe, SpinnerComponent, RefreshPageButtonComponent, AddNewButtonComponent, SearchComponent, ActionsDropdownComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements CrudActions, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly allReservations$!: Observable<ReservationApi[]>;
  dropdownActions: DropdownActions[] = [
    { title: 'Active', icon: 'bi-circle' },
    { title: 'Completed', icon: 'bi bi-check-circle' },
    { title: 'Ascending', icon: 'bi bi-arrow-up' },
    { title: 'Descending', icon: 'bi bi-arrow-down' },
  ]
  status!: Status;
  reservations$!: Observable<ReservationApi[]>;
  searchQueryState$!: Observable<string>;
  isDarkTheme!: boolean;

  constructor(
    private readonly reservationHttpService: ReservationHttpService,
    private readonly searchStateService: SearchStateService,
    private readonly alertService: AlertService,
    private readonly themeService: ThemeService,
    private readonly router: Router,

  ) {
    this.allReservations$ = this.reservationHttpService.getReservations();
    this.reservations$ = this.allReservations$;
    this.themeService.isDarkThemeStream$.subscribe(isDarkTheme => this.isDarkTheme = isDarkTheme);
    this.searchQueryState$ = this.searchStateService.searchStream$;
    this.searchQueryState$
      .pipe(takeUntil(this.destroy$), filter((searchQuery: string) => searchQuery.length >= 0))
      .subscribe((data) => {
        this.fetchFilteredReservations(data);
      });
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
    this.reservations$ = this.reservationHttpService.getReservations();
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
          this.reservations$ = this.reservationHttpService.getReservations();

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
  /**
  * @konstantinosporo
  * @description
  * Actively filters the api for close matxhes of the searched query string.
  * Accepts a text string as a param.
  */
  fetchFilteredReservations(text: string) {
    if (text.length === 0) {
      this.reservations$ = this.allReservations$;
    } else {
      this.reservations$ = this.allReservations$.pipe(
        map((reservations) =>
          reservations.filter((reservation) => {
            const bookName = reservation?.book?.name?.toLowerCase() || '';
            const authorName = reservation?.book?.author?.toLowerCase() || '';
            const status = reservation?.status?.toLowerCase() || '';
            const searchText = text.toLowerCase();

            return (
              bookName.includes(searchText) ||
              authorName.includes(searchText) ||
              status === searchText
            );
          })
        )
      );
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
