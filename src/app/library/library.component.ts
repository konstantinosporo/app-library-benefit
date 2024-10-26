import { AsyncPipe } from '@angular/common';
import { Component, ViewChildren } from '@angular/core';
import { combineLatest, filter } from 'rxjs';
import { CrudActions } from '../_lib/interfaces';
import { LibraryHttpService } from '../services/library/library-http.service';
import { SearchStateService } from '../services/search-state.service';
import { AddNewButtonComponent } from "../shared/buttons/add-new-button/add-new-button.component";
import { BookApi } from './book/book';
import { BookComponent } from "./book/book.component";
import { SearchBookComponent } from "./search-book/search-book.component";
import { SearchFilterComponent } from "./search-book/search-filter/search-filter.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [SearchBookComponent, BookComponent, AsyncPipe, SearchFilterComponent, AddNewButtonComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements CrudActions {
  // Simple array for adding more filters
  filterList: { id: string, title: string }[] = [
    { id: 'all', title: 'All Books' },
    { id: 'available', title: 'Available Books' },
  ];
  // two tables one that holds all the books, and the filtered one
  data: BookApi[] = [];
  filteredBookList: BookApi[] = [];
  // view child add new button
  @ViewChildren(AddNewButtonComponent) addBookComponent!: AddNewButtonComponent;

  // Better practice and more efficient. Using a State Service.
  constructor(private readonly searchStateService: SearchStateService, private readonly libraryHttpService: LibraryHttpService, private readonly router: Router) {
    this.libraryHttpService.getBooks().subscribe(books => {
      this.data = books;
      combineLatest([
        this.searchStateService.filterStream$,
      ]).pipe(
        filter(() => !!this.data)
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
      this.filteredBookList = this.data;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    this.filteredBookList = this.data.filter(book =>
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
      this.filteredBookList = this.data;
    } else if (filterId === 'available') {
      this.filteredBookList = this.data.filter(book => book.available);
    }
  }

  //get actions and id from child
  getAction(values: string[]) {
    console.log(`Values got from child ${values[0]} and ${values[1]}`);
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

  add() {
    this.router.navigate(['library', 'add-book']);
  }

  view(id: string) {
    console.log('View' + "" + id);
  }
  edit(id: string) {
    console.log('Edit' + "" + id);
  }
  delete(id: string) {
    console.log('Delete' + "" + id);
  }


}
