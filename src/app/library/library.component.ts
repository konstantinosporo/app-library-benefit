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
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  filterList: { id: string, title: string }[] = [
    { id: 'all', title: 'All Books' },
    { id: 'available', title: 'Available Books' },
  ];
  
  allBooks: BookApi[] = [];
  filteredBookList: BookApi[] = [];
  chunkedBookList: BookApi[][] = [];
  currentPage = 0;
  itemsPerPage = 3;

  constructor(
    private readonly searchStateService: SearchStateService, 
    private readonly libraryHttpService: LibraryHttpService
  ) {
    this.libraryHttpService.getBooks().subscribe(books => {
      this.allBooks = books;
      this.updateFilteredListViaFilter('all'); // initialize filter with all books
      this.chunkBooks(); // run the chunking method
      combineLatest([this.searchStateService.filterStream$])
        .pipe(filter(() => !!this.allBooks))
        .subscribe(([id]) => {
          this.updateFilteredListViaFilter(id);
        });
    });

    this.searchStateService.searchStream$.subscribe(search => this.updateFilteredListViaSearch(search));
  }

  updateFilteredListViaSearch(searchQuery: string) {
    if (!searchQuery) {
      this.filteredBookList = this.allBooks;
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      this.filteredBookList = this.allBooks.filter(book =>
        book.name.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery)
      );
    }
    this.chunkBooks(); // re-chunk after filtering
    this.currentPage = 0; // reset page to start
  }

  updateFilteredListViaFilter(filterId: string) {
    if (filterId === 'all') {
      this.filteredBookList = this.allBooks;
    } else if (filterId === 'available') {
      this.filteredBookList = this.allBooks.filter(book => book.available);
    }
    this.chunkBooks(); 
    this.currentPage = 0; 
  }

  chunkBooks() {
    this.chunkedBookList = [];
    for (let i = 0; i < this.filteredBookList.length; i += this.itemsPerPage) {
      this.chunkedBookList.push(this.filteredBookList.slice(i, i + this.itemsPerPage));
    }
  }

  get paginatedBooks(): BookApi[] {
    return this.chunkedBookList[this.currentPage] || []; 
  }

  nextPage() {
    if ((this.currentPage + 1) < this.chunkedBookList.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  isNextPageDisabled(): boolean {
    return (this.currentPage + 1) >= this.chunkedBookList.length;
  }

  isPreviousPageDisabled(): boolean {
    return this.currentPage <= 0;
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.chunkedBookList.length) {
      this.currentPage = page;
    }
  }
  
   get totalPages(): number {
    return this.chunkedBookList.length;
  }
}
