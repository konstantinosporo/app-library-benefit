import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchStateService } from '../../services/search-state.service';
import { SearchFilterComponent } from "./search-filter/search-filter.component";
import { AddNewButtonComponent } from "../../shared/buttons/add-new-button/add-new-button.component";

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [SearchFilterComponent, AddNewButtonComponent],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.css'
})
export class SearchBookComponent {
  constructor(private readonly searchStateService: SearchStateService) { }
  @Input() filterList: { id: string, title: string }[] = [];
  @Output() clickEvent: EventEmitter<void> = new EventEmitter();

  /**
   * @konstantinosporo
   * @description
   * Method to update the State when the search button is clicked.
   * @param {string} searchQuery
   */
  handleStateSearch(searchQuery: string) {
    console.log(`From Search-Book Component: ${searchQuery}`);
    this.searchStateService.updateSearch(searchQuery);
  }
  handleClickEvent() {
    this.clickEvent.emit();
  }
}
