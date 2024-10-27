import { Component, Input } from '@angular/core';
import { SearchStateService } from '../../services/search-state.service';
import { AddNewButtonComponent } from "../buttons/add-new-button/add-new-button.component";

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [AddNewButtonComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private readonly searchStateService: SearchStateService) { }
  @Input() showContent: boolean = false;
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
