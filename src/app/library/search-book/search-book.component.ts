import { Component, Input } from '@angular/core';
import { SearchStateService } from '../../services/search-state.service';
import { SearchFilterComponent } from "./search-filter/search-filter.component";

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [SearchFilterComponent],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.css'
})
export class SearchBookComponent {
  constructor(private readonly searchStateService: SearchStateService) { }
  @Input() filterList: {id:string, title: string}[] = [];
  
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
}
