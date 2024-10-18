import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { SearchStateService } from '../services/search-state.service';
import { BookApi } from './book/book';
import { BookComponent } from "./book/book.component";
import { SearchBookComponent } from "./search-book/search-book.component";
import { LibraryHttpService } from '../services/library/library-http.service';
import { combineLatest, filter } from 'rxjs';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [SearchBookComponent, BookComponent, AsyncPipe],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {
  // Simple array for adding more filters
  filterList: { id: string, title: string }[] = [
    { id: 'all', title: 'All Books' },
    { id: 'available', title: 'Available Books' },
  ];
  // two tables one that holds all the books, and the filtered one
  allBooks: BookApi[] = [];
  filteredBookList: BookApi[]= [];

  // Better practice and more efficient. Using a State Service.
  constructor(private readonly searchStateService: SearchStateService, private readonly libraryHttpService: LibraryHttpService) {
    this.libraryHttpService.getBooks().subscribe(books => {
      this.allBooks = books;
      combineLatest([
        this.searchStateService.filterStream$,
      ]).pipe(
        filter(() => !!this.allBooks)
      ).subscribe(([id]) => {
        this.updateFilteredListViaFilter(id);
      });
    }
    );
    this.searchStateService.searchStream$.subscribe(search => this.updateFilteredListViaSearch(search));
  }
  /**
   * @konstantinosporo
   * @description
   * A void method that filters the booksdepending on the state query string.
   * @param searchQuery 
   */
  updateFilteredListViaSearch(searchQuery: string) {
    // if search query not provided dont filter
    if (!searchQuery) {
      this.filteredBookList = this.allBooks;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    this.filteredBookList = this.allBooks.filter(book =>
      book.name.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery)
    );
  }
  /**
   * @konstantinosporo
   * @description
   * A void method that filters the books depending on filter buttons.
   * @param searchQuery 
   */
  updateFilteredListViaFilter(filterId: string) {
    if (filterId === 'all') {
      this.filteredBookList = this.allBooks;
    } else if (filterId === 'available') {
      this.filteredBookList = this.allBooks.filter(book => book.available);
    }
  }


}
