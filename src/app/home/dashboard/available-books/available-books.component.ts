import { Component } from '@angular/core';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { BookApi } from '../../../books/book/book';
import { BookHttpService } from '../../../services/book/book-http.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { SearchComponent } from '../../../shared/search/search.component';
import { Router, RouterLink } from '@angular/router';
import { SearchStateService } from '../../../services/search-state.service';
import { ActionsDropdownComponent } from "../../../shared/buttons/actions-dropdown/actions-dropdown.component";
import { DropdownActions } from '../../../shared/buttons/actions-dropdown/dropdown';
import { RefreshPageButtonComponent } from "../../../shared/buttons/refresh-page-button/refresh-page-button.component";
import { AddNewButtonComponent } from "../../../shared/buttons/add-new-button/add-new-button.component";

@Component({
  selector: 'app-available-books',
  standalone: true,
  imports: [AsyncPipe, SpinnerComponent, SearchComponent, DatePipe, RouterLink, ActionsDropdownComponent, RefreshPageButtonComponent, AddNewButtonComponent],
  templateUrl: './available-books.component.html',
  styleUrl: './available-books.component.css'
})
export class AvailableBooksComponent {
  private readonly allAvailableBooks$!: Observable<(BookApi | undefined)[]>;
  private readonly destroy$ = new Subject<void>();
  availableBooks$!: Observable<(BookApi | undefined)[]>;
  searchQueryState$!: Observable<string>;
  dropdownActions: DropdownActions[] = [
    { id: 'asc', title: 'Ascending', icon: 'bi bi-arrow-up' },
    { id: 'desc', title: 'Descending', icon: 'bi bi-arrow-down' },
  ];

  constructor(
    private readonly bookHttpService: BookHttpService,
    private readonly searchStateService: SearchStateService,
    private readonly router : Router
  ) {
    this.allAvailableBooks$ = this.bookHttpService.getAvailableBooks();
    this.availableBooks$ = this.allAvailableBooks$;
    this.searchQueryState$ = this.searchStateService.searchStream$;
    this.searchQueryState$
      .pipe(takeUntil(this.destroy$), filter((searchQuery: string) => searchQuery.length >= 0))
      .subscribe((data) => {
        this.fetchFilteredBooks(data);
      });
  }
  /**
   * @konstantinosporo
   * @description
   * Actively filters the api for close matches of the searched query string.
   * Accepts a text string as a param.
   */
  fetchFilteredBooks(text: string) {
    if (text.length === 0) {
      this.availableBooks$ = this.allAvailableBooks$;
    } else {
      // console.log(`FROM THE METHOD fetchdata(): ${text}`);
      this.availableBooks$ = this.allAvailableBooks$.pipe(map((books) => books.filter((book) => {
        return book?.name.toLowerCase().includes(text.toLowerCase()) || book?.author.toLowerCase().includes(text.toLowerCase());
      })));
    }
  }
  getClickedDropdownId(id: string) {
    //console.log(id + '' + 'from father comp');
    switch (id) {
      case ('asc'):
        this.fetchFilteredAscAvailableBooks();
        // TODO PRESENTATION ONLY UNCOMMENT TO PRESENT THE SSR SEARCH SCENARIO
        //this.fetchFilteredAscBooksSSR(Sort.ASC);
        break;
      case ('desc'):
        this.fetchFilteredDescAvailableBooks();
        // TODO PRESENTATION ONLY UNCOMMENT TO PRESENT THE SSR SEARCH SCENARIO
        //this.fetchFilteredAscBooksSSR(Sort.DESC);
        break;
      default: break;
    }
  }
  /**
   * @description Client side filter.
   */
  fetchFilteredAscAvailableBooks() {
    this.availableBooks$ = this.allAvailableBooks$.pipe(
      map((books) =>
        books.slice().sort((a, b) => {
          const nameA = (a?.name ?? '').toLowerCase();
          const nameB = (b?.name ?? '').toLowerCase();
          return nameA.localeCompare(nameB); // Ascending order
        })
      )
    );
  }
  /**
   * @description Client side filter.
   */
  fetchFilteredDescAvailableBooks() {
    this.availableBooks$ = this.allAvailableBooks$.pipe(
      map((availableBooks) =>
        availableBooks.slice().sort((a, b) => {
          const nameA = (a?.name ?? '').toLowerCase();
          const nameB = (b?.name ?? '').toLowerCase();
          return nameB.localeCompare(nameA); // Descending order
        })
      )
    );
  }
  /**
   * @description Quick navigate to create a book.
   */
  add(route: string) {
    this.router.navigate([route]);
  }
  /**
  * @description Refreshes the books observable.
  */
  refreshAvailableBooks() {
    this.availableBooks$ = this.bookHttpService.getAvailableBooks();
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
