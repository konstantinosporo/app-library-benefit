import { Component } from '@angular/core';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { BookApi } from '../../../books/book/book';
import { BookHttpService } from '../../../services/book/book-http.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { SearchComponent } from '../../../shared/search/search.component';
import { RouterLink } from '@angular/router';
import { SearchStateService } from '../../../services/search-state.service';

@Component({
  selector: 'app-available-books',
  standalone: true,
  imports: [AsyncPipe, SpinnerComponent, SearchComponent, DatePipe, RouterLink],
  templateUrl: './available-books.component.html',
  styleUrl: './available-books.component.css'
})
export class AvailableBooksComponent {
  private readonly allAvailableBooks$!: Observable<(BookApi | undefined)[]>;
  private readonly destroy$ = new Subject<void>();
  availableBooks$!: Observable<(BookApi | undefined)[]>;
  searchQueryState$!: Observable<string>;


  constructor(
    private readonly bookHttpService: BookHttpService,
    private readonly searchStateService: SearchStateService,
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
