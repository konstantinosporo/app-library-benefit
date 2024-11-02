import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { SearchComponent } from '../shared/search/search.component';
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { BookApi } from './book/book';
import { BookComponent } from "./book/book.component";

import { Router } from '@angular/router';
import { CrudActions } from '../_lib/interfaces';
import { AlertService } from '../services/alert-handlers/alert.service';
import { BookHttpService } from '../services/book/book-http.service';
import { SearchStateService } from '../services/search-state.service';
import { AddNewButtonComponent } from "../shared/buttons/add-new-button/add-new-button.component";
import { FilterComponent } from "../shared/search/filter/filter.component";
import { Filter, filterList, FilterID as ID } from '../shared/search/filter/filters';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, SearchComponent, SpinnerComponent, BookComponent, AddNewButtonComponent, FilterComponent],
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
  // Load the external filterlist
  filters: Filter[] = filterList;
  filterState$!: Observable<string>;
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
    this.allBooks$ = this.booksHttpService.getBooks();
    this.books$ = this.allBooks$;
    this.searchQueryState$ = this.searchStateService.searchStream$;
    this.filterState$ = this.searchStateService.filterStream$;
    this.searchQueryState$
      .pipe(takeUntil(this.destroy$), filter((searchQuery: string) => searchQuery.length >= 0))
      .subscribe((data) => {
        this.fetchFilteredBooks(data);
      });

    // subsribe to filter state service observable 
    this.filterState$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      //console.log(data);
      this.applyFilter(data as ID);
    });

  }
  /**
   * @konstantinosporo
   * @description
   * Actively filters the api for close mathes of the searched query string.
   * Accepts a text string as a param.
   */
  fetchFilteredBooks(text: string) {
    if (text.length === 0) {
      this.books$ = this.allBooks$;
    } else {
      // console.log(`FROM THE METHOD fetchdata(): ${text}`);
      this.books$ = this.allBooks$.pipe(map((books) => books.filter((book) => {
        return book.name.toLowerCase().includes(text.toLowerCase()) || book.author.toLowerCase().includes(text.toLowerCase());
      })));
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
   * @konstantinosporo
   * @description
   * Attempt to delete the specified record from the API endpoint.
   * The delete method of the api might not work so i have to ask.
   * This method is subject to change because i get 404 when i try to delete for now.
   */
  confirmDelete(id: string) {
    this.booksHttpService.deleteBookById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (book: BookApi) => {
        this.alertService.showSuccessToast(`Book with ID: ${book._id} successfully deleted!`);
        this.router.navigate(['books']);
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
  /**
   * @konstantinosporo
   * Applies the specified filter to the book list by updating the relevant observable 
   * and setting the appropriate filter as checked.
   * @param filterId - The filter ID to apply (either ID.ALL or ID.AVAILABLE).
   */
  applyFilter(filterId: ID) {
    // reset filters to avoid check radio bugs
    this.filters.forEach(filter => filter.isChecked = false);

    if (filterId === ID.ALL) {
      this.books$ = this.allBooks$;
      // find and mark the 'ALL' filter as checked for UI consistency.
      const allFilter = this.filters.find(filter => filter.id === ID.ALL);
      if (allFilter) {
        allFilter.isChecked = true;
      }
    } else if (filterId === ID.AVAILABLE) {
      // find and mark the 'AVAILABLE' filter as checked.
      const availableFilter = this.filters.find(filter => filter.id === ID.AVAILABLE);
      if (availableFilter) {
        availableFilter.isChecked = true;
      }
      // apply the available books filter by fetching only books marked as available.
      this.fetchAvailableBooks();
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
