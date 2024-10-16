import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.css'
})
export class SearchBookComponent {
  /**
   * @konstantinosporo
   * @description
   * This is a custom binding event.
   * It emits a string value to its father component when a user
   * clicks the search button.
   * @emitparameter string
   */
  @Output() handleSearchQueryEvent: EventEmitter<string> = new EventEmitter<string>();
  /**
   * @konstantinosporo
   * @description
   * Handler for emitting the typed query.
   * @param searchQuery 
   */
  handleSearch(searchQuery: string) {
    //console.log(`Child: Searched for: ${searchQuery}`);
    this.handleSearchQueryEvent.emit(searchQuery);
  }
}
