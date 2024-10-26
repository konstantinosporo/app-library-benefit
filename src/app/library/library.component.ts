import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, filter, startWith } from 'rxjs';
import { CrudActions } from '../_lib/interfaces';
import { AlertService } from '../services/alert-handlers/alert.service';
import { LibraryHttpService } from '../services/library/library-http.service';
import { SearchStateService } from '../services/search-state.service';
import { AddNewButtonComponent } from "../shared/buttons/add-new-button/add-new-button.component";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { BookApi } from './book/book';
import { BookComponent } from "./book/book.component";
import { SearchBookComponent } from "./search-book/search-book.component";
import { SearchFilterComponent } from "./search-book/search-filter/search-filter.component";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [SearchBookComponent, BookComponent, AsyncPipe, SearchFilterComponent, AddNewButtonComponent, SpinnerComponent],
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
  data!: BookApi[];
  filteredBookList!: BookApi[];

  // Better practice and more efficient. Using a State Service.
  constructor(
    private readonly searchStateService: SearchStateService,
    private readonly libraryHttpService: LibraryHttpService,
    private readonly alertService: AlertService,
    private readonly router: Router) {
    this.libraryHttpService.getBooks().subscribe(books => {
      this.data = books;

      combineLatest([
        this.searchStateService.filterStream$.pipe(startWith('all')), // Provide a default value
      ]).pipe(
        filter(() => !!this.data)
      ).subscribe(([id]) => {
        this.updateFilteredListViaFilter(id);
      });
    });

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
    this.router.navigate(['library', `view-book`, id]);
  }

  edit(id: string) {
    console.log('Edit' + "" + id);
  }
  delete(id: string) {
    //console.log(id);
    this.alertService.showVerificationModal('Confirm Deletion', `Are you sure you want to delete book with ID: ${id}`, () => this.confirmDelete(id));
  }

  confirmDelete(id: string) {
    this.libraryHttpService.deleteBook(id).subscribe({
      next: (user: BookApi) => {
        this.alertService.showSuccess(`Book with ID: ${user._id} successfully deleted!`);
      },
      error: (err) => {
        console.error('Error deleting book:', err); // Log full error
        if (err instanceof Error) {
          throw new Error(`Error deleting book: ${err.message}`);
        } else {
          throw new Error('Error deleting book.');
        }
      }
    });
  }


}
