import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { SearchComponent } from '../shared/search/search.component';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { BookApi, Sort } from './book/book';
import { BookComponent } from "./book/book.component";

import { Router } from '@angular/router';
import { CrudActions } from '../_lib/interfaces';
import { AlertService } from '../services/alert-handlers/alert.service';
import { BookHttpService } from '../services/book/book-http.service';
import { SearchStateService } from '../services/search-state.service';
import { ActionsDropdownComponent } from "../shared/buttons/actions-dropdown/actions-dropdown.component";
import { DropdownActions } from '../shared/buttons/actions-dropdown/dropdown';
import { AddNewButtonComponent } from "../shared/buttons/add-new-button/add-new-button.component";
import { RefreshPageButtonComponent } from "../shared/buttons/refresh-page-button/refresh-page-button.component";
import { FilterComponent } from "../shared/search/filter/filter.component";
import { ToggleSsrButtonComponent } from "../shared/buttons/toggle-ssr-button/toggle-ssr-button.component";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, SearchComponent, SpinnerComponent, BookComponent, AddNewButtonComponent, FilterComponent, ActionsDropdownComponent, RefreshPageButtonComponent, ToggleSsrButtonComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements CrudActions {
  // Private allBooks stream because i dont use this in my template.(filters, searches)
  private readonly allBooks$!: Observable<BookApi[]>;
  private readonly destroy$ = new Subject<void>();
  /**
   * @konstantinosporo
   * @description 
   * Initializing the observable variables that will carry the book data,
   * while the lifecycle of this component is there.
   */
  books$!: Observable<BookApi[]>;
  searchQueryState$!: Observable<string>;

  dropdownActions: DropdownActions[] = [
    { id: 'all', title: 'All', icon: 'bi-circle' },
    { id: 'available', title: 'Available', icon: 'bi bi-check-circle' },
    { id: 'asc', title: 'Ascending', icon: 'bi bi-arrow-up' },
    { id: 'desc', title: 'Descending', icon: 'bi bi-arrow-down' },
  ];

  // For Presentation Purposes Only.
  ssrMode: boolean = false;

  /**
   * @konstantinosporo
   * @description
   * Initialize this component with the following services.
   * Assign all books to allBooks$.
   * Assing allBooks$ to books$ so i can always filter for the orginal API stream.
   * Assign the search state string to searchQuery$.
   * Filter the books shown to user given the string he types.
   * ***** VARIABLES WITH TRAILING DOLLAR SIGN $ ARE ALWAYS OBSERVABLES *****
   */
  constructor(
    private readonly booksHttpService: BookHttpService,
    private readonly searchStateService: SearchStateService,
    private readonly alertService: AlertService,
    private readonly router: Router,
  ) {
    this.ssrMode = false;
    this.allBooks$ = this.booksHttpService.getBooks();
    this.books$ = this.allBooks$;
    this.searchQueryState$ = this.searchStateService.searchStream$;
    this.searchQueryState$
      .pipe(takeUntil(this.destroy$), filter((searchQuery: string) => searchQuery.length >= 0))
      .subscribe((data) => {
        !this.ssrMode ? this.fetchFilteredBooks(data) : this.fetchFilteredBooksSSR(data);
        // TODO PRESENTATION ONLY UNCOMMENT TO PRESENT THE SSR SEARCH SCENARIO
        //this.fetchFilteredBooksSSR(data);
      });
  }
  /**
   * @konstantinosporo
   * @description
   * Actively filters the api for close mathes of the searched query string.
   * Accepts a text string as a param.
   */
  fetchFilteredBooks(text: string) {
    if (text.trim().length === 0) {
      this.books$ = this.allBooks$;
    } else {
      const searchTerms = text.toLowerCase().trim().split(' ');

      this.books$ = this.allBooks$.pipe(
        map((books) =>
          books.filter((book) => {
            const bookId = book?._id?.toLowerCase() || '';
            const bookName = book?.name?.toLowerCase() || '';
            const bookAuthor = book?.author?.toLowerCase() || '';
            const bookType = book?.type?.toLowerCase() || '';
            const bookPublished = book?.year || '';

            return searchTerms.every((term) =>
              bookId.includes(term) ||
              bookName.includes(term) ||
              bookAuthor.includes(term) ||
              bookType.includes(term) ||
              bookPublished.toString().includes(term)
            );
          })
        )
      );
    }
  }
  /**
   * @konstantinosporo
   * @description
   * Filters the api server side for close mathes of the searched query string.
   * Accepts a text string as a param.
   * // TODO PRESENTATION ONLY UNCOMMENT TO PRESENT THE SSR SEARCH SCENARIO
   */
  fetchFilteredBooksSSR(text: string) {
    if (text.length === 0) {
      this.books$ = this.allBooks$;
    } else {
      // console.log(`FROM THE METHOD fetchdata(): ${text}`);
      this.books$ = this.booksHttpService.getBookSSR(text);
    }
  }
  /**
   * @konstantinosporo
   * @description
   * Actively filters the api for available books.
   */
  fetchAvailableBooks() {
    // console.log(`FROM THE METHOD fetchdata(): ${text}`);
    this.books$ = this.allBooks$.pipe(map((books) => books.filter((book) => {
      return book.available;
    })));
  }
  /**
   * @konstantinosporo
   * Get the $event emitted on Book Component.
   * The event is of type string[].
   * Index 0 > book id. 
   * Index 1 > action name (view, edit, delete). 
   */
  handleAction(values: string[]) {
    //console.log(`Values got from child ${values[0]} and ${values[1]}`);
    switch (values[1]) {
      case 'view':
        this.view(values[0]);
        break;
      case 'edit':
        this.edit(values[0]);
        break;
      case 'delete':
        this.delete(values[0]);
        break;
      default: break;
    }
  }
  /**
   * @konstantinosporo
   * @description
   * Navigate to the books/add-book route when the add new button is cliked.
   * It gets a route string as a param.
   */
  add(route: string) {
    this.router.navigate([route]);
  }
  /**
   * @konstantinosporo
   * Navigate to the books/view-book route when view button is clicked.
   * This route is dynamic!!! This means that if you refresh the item insists in the page.
   * Also the url can be copy pasted and the page will load with the id specified in the url.
   * It gets a book id as a param.
   */
  view(id: string) {
    this.router.navigate([`book/${id}/view`]);
  }
  /**
   * @konstantinosporo
   * @description
   * NOT IMPLEMENTED YET
   */
  edit(id: string) {
    this.router.navigate([`book/${id}/edit`]);
  }
  /**
   * @konstantinosporo
   * @description
   * Trigger the danger modal for delete verification.
   * This method doesnt delete the item on its own.
   * It just asks for confirmation. The showDangerModal method, accepts 
   * a custom callback function as a parameter which gets triggered if the 
   * modal is there and if the users clicks accept.
   */
  delete(id: string) {
    //console.log(id);
    this.alertService.showDangerModal('Confirm Deletion', `Are you sure you want to delete book with ID: ${id}`, () => this.confirmDelete(id), 'Delete Book');
  }
  /**
   * @description Refreshes the books observable.
   */
  refreshBooks() {
    this.books$ = this.booksHttpService.getBooks();
  }
  getClickedDropdownId(id: string) {
    //console.log(id + '' + 'from father comp');
    switch (id) {
      case ('all'):
        this.fetchFilteredAllBooks();
        break;
      case ('available'):
        this.fetchFilteredAvailableBooks();
        break;
      case ('asc'):
        !this.ssrMode ? this.fetchFilteredAscBooks() : this.fetchFilteredAscBooksSSR(Sort.ASC);
        // TODO PRESENTATION ONLY UNCOMMENT TO PRESENT THE SSR SEARCH SCENARIO
        //this.fetchFilteredAscBooksSSR(Sort.ASC);
        break;
      case ('desc'):
        !this.ssrMode ? this.fetchFilteredDescBooks() : this.fetchFilteredAscBooksSSR(Sort.DESC);
        // TODO PRESENTATION ONLY UNCOMMENT TO PRESENT THE SSR SEARCH SCENARIO
        //this.fetchFilteredAscBooksSSR(Sort.DESC);
        break;
      default: break;
    }
  }
  fetchFilteredAllBooks() {
    this.books$ = this.booksHttpService.getBooks();
  }
  fetchFilteredAvailableBooks() {
    this.books$ = this.allBooks$.pipe(
      map((books) =>
        books.filter((book) => {
          return book.available === true;
        })
      )
    );
  }
  /**
   * @description Client side filter.
   */
  fetchFilteredAscBooks() {
    this.books$ = this.allBooks$.pipe(
      map((books) =>
        books.slice().sort((a, b) => {
          const nameA = (a.name ?? '').toLowerCase();
          const nameB = (b.name ?? '').toLowerCase();
          return nameA.localeCompare(nameB); // Ascending order
        })
      )
    );
  }
  /**
   * @description Server side filter.
   */
  fetchFilteredAscBooksSSR(sort: Sort) {
    this.books$ = this.booksHttpService.getFilteredSortSSR(sort);
  }
  /**
   * @description Client side filter.
   */
  fetchFilteredDescBooks() {
    this.books$ = this.allBooks$.pipe(
      map((books) =>
        books.slice().sort((a, b) => {
          const nameA = (a.name ?? '').toLowerCase();
          const nameB = (b.name ?? '').toLowerCase();
          return nameB.localeCompare(nameA); // Descending order
        })
      )
    );
  }
  /**
   * @konstantinosporo
   * @description
   * Attempt to delete the specified record from the API endpoint.
   * The delete method of the api might not work so i have to ask.
   * This method is subject to change because i get 404 when i try to delete for now.
   */
  confirmDelete(id: string) {
    this.booksHttpService.deleteBookById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (book: BookApi) => {
        this.alertService.showSuccessToast(`Book with ID: ${id} successfully deleted!`);
        this.books$ = this.booksHttpService.getBooks();
      },
      error: (err) => {
        //console.error('Error deleting book:', err);
        if (err instanceof Error) {
          throw new Error(`Error deleting book: ${err.message}`);
        } else {
          throw new Error('Error deleting book.');
        }
      }
    });
  }

  createImgUrls(book: BookApi): string {
    switch (book.type) {
      case ('Non-Fiction'):
        return `/bookCovers/nonFiction.jpg`
      case ('Fiction'):
        return `/bookCovers/fiction.jpg`
      case ('Biography'):
        return `/bookCovers/bio.png`
      case ('Sci-Fi'):
        return `/bookCovers/sciFi.jpg`
      default: return `/library/book.webp`;
    }
  }
  toggleSSR() {
    this.ssrMode = !this.ssrMode;
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
