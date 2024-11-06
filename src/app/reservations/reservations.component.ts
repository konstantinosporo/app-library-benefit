import { AsyncPipe, DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { CrudActions } from '../_lib/interfaces';
import { AlertService } from '../services/alert-handlers/alert.service';
import { ReservationHttpService } from '../services/reservations/reservation-http.service';
import { SearchStateService } from '../services/search-state.service';
import { ThemeService } from '../services/theme/theme.service';
import { ActionsDropdownComponent } from "../shared/buttons/actions-dropdown/actions-dropdown.component";
import { DropdownActions } from '../shared/buttons/actions-dropdown/dropdown';
import { AddNewButtonComponent } from "../shared/buttons/add-new-button/add-new-button.component";
import { RefreshPageButtonComponent } from "../shared/buttons/refresh-page-button/refresh-page-button.component";
import { SearchComponent } from "../shared/search/search.component";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { ReservationApi, Status } from './reservation';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgClass, UpperCasePipe, SpinnerComponent, RefreshPageButtonComponent, AddNewButtonComponent, SearchComponent, ActionsDropdownComponent, RouterLink],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements CrudActions, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly allReservations$!: Observable<ReservationApi[]>;
  reservations$!: Observable<ReservationApi[]>;
  status!: Status;
  searchQueryState$!: Observable<string>;
  isDarkTheme!: boolean;

  dropdownActions: DropdownActions[] = [
    { id: 'active', title: 'Active', icon: 'bi-circle' },
    { id: 'completed', title: 'Completed', icon: 'bi bi-check-circle' },
    { id: 'asc', title: 'Ascending', icon: 'bi bi-arrow-up' },
    { id: 'desc', title: 'Descending', icon: 'bi bi-arrow-down' },
  ];

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
      .subscribe((searchQuery) => {
        this.fetchFilteredReservations(searchQuery);
      });
  }
  // Check in CrudAction interface for more information app > lib > interfaces.ts
  add(route: string) {
    //console.log(route);
    this.router.navigate([route]);
  }
  view(id: string) {
    //console.log(id);
  }
  edit(id: string) {
    //console.log(id);
  }
  delete(id: string) {
    //console.log(id);
  }
  refreshCustomers() {
    this.reservations$ = this.reservationHttpService.getReservations();
  }
  getClickedDropdownId(id: string) {
    //console.log(id + '' + 'from father comp');
    switch (id) {
      case ('active'):
        this.fetchFilteredActiveReservations();
        break;
      case ('completed'):
        this.fetchFilteredCompletedReservations();
        break;
      case ('asc'):
        this.fetchFilteredAscReservations();
        break;
      case ('desc'):
        this.fetchFilteredDescReservations();
        break;
      default: break;
    }
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
 * Actively filters the API for close matches of the searched query string.
 * Accepts a text string as a param.
 */
  fetchFilteredReservations(text: string) {
    if (text.length === 0) {
      this.reservations$ = this.allReservations$;
    } else {
      this.reservations$ = this.allReservations$.pipe(
        map((reservations) =>
          reservations.filter((reservation) => {
            // Trim and split the search query text first
            const searchTextParts = text.toLowerCase().trim().split(' ');

            const bookName = reservation?.book?.name?.toLowerCase() || '';
            const authorName = reservation?.book?.author?.toLowerCase() || '';
            const bookId = reservation?.book?._id?.toLowerCase() || '';
            const customerName = reservation?.customer?.name.toLowerCase() || '';
            const customerSurname = reservation?.customer?.surname.toLowerCase() || '';
            const customerId = reservation.customer?._id?.toLowerCase() || '';
            const status = reservation?.status?.toLowerCase() || '';

            return (
              bookName.includes(searchTextParts.join(' ')) ||
              authorName.includes(searchTextParts.join(' ')) ||
              bookId.includes(searchTextParts.join(' ')) ||
              customerId.includes(searchTextParts.join(' ')) ||
              status === searchTextParts.join(' ') ||
              searchTextParts.every((part) =>
                customerName.includes(part) || customerSurname.includes(part)
              ) 
            );
          })
        )
      );
    }
  }

  /**
   * @konstantinosporo
   * @description
   * Filter active reservations method.
   */
  fetchFilteredActiveReservations() {
    //console.log('clicked active filter!');
    this.reservations$ = this.allReservations$.pipe(
      map((reservations) =>
        reservations.filter((reservation) => {
          return reservation.status === Status.ACTIVE;
        })
      )
    );
  }
  /**
   * @konstantinosporo
   * @description
   * Filter completed reservations method.
   */
  fetchFilteredCompletedReservations() {
    //console.log('clicked completed filter!');
    this.reservations$ = this.allReservations$.pipe(
      map((reservations) =>
        reservations.filter((reservation) => {
          return reservation.status === Status.COMPLETED;
        })
      )
    );
  }
  /**
   * @konstantinosporo
   * @description
   * Filter reservations in ascending order by Reserved On date.
   */
  fetchFilteredAscReservations() {
    this.reservations$ = this.allReservations$.pipe(
      map((reservations) =>
        reservations.slice().sort((a, b) => {
          const dateA = new Date(a.reservedOn ?? 0);
          const dateB = new Date(b.reservedOn ?? 0);
          return dateA.getTime() - dateB.getTime(); // Ascending order
        })
      )
    );
  }
  /**
 * @konstantinosporo
 * @description
 * Filter reservations in descending order by Reserved On date.
 */
  fetchFilteredDescReservations() {
    this.reservations$ = this.allReservations$.pipe(
      map((reservations) =>
        reservations.slice().sort((a, b) => {
          const dateA = new Date(a.reservedOn ?? 0);
          const dateB = new Date(b.reservedOn ?? 0);
          return dateB.getTime() - dateA.getTime(); // Descending order
        })
      )
    );
  }
  /**
   * @konstantinosporo
   * @description Checks either a book has passed return date.
   */
  checkOverdue(reservation: ReservationApi): boolean {
    return (new Date(reservation.returnBy) < new Date());
  }
  /*
   * @konstantinosporo
   * @description Change color of return by date to notify that a book is close to return.
   */
  getReturnByInfo(reservation: ReservationApi): { notify: string, class?: string, progress: number } {
    const daysLeft = (new Date(reservation.returnBy).getTime() - new Date().getTime()) / (1000 * 3600 * 24);

    if (daysLeft < 0) return { notify: 'Return date is overdue.', class: 'progress-red', progress: 100 };
    if (daysLeft <= 7) return { notify: 'Return date is less than a week away.', class: 'progress-orange', progress: 70 };
    if (daysLeft <= 30) return { notify: 'Return date is less than a month away.', class: 'progress-yellow', progress: 40 };

    return { notify: 'Return date is more than a month away.', class: 'progress-green', progress: 10 };
  }
  /**
   * @konstantinosporo
   * @description Catching the ng destroy hook to terminate subsriptions on destroy.
   */
  ngOnDestroy() {
    this.searchStateService.resetSearch();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
