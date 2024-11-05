import { Component, Input } from '@angular/core';
import { SearchStateService } from '../../services/search-state.service';
import { AddNewButtonComponent } from "../buttons/add-new-button/add-new-button.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AddNewButtonComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] // Note: Fix this to 'styleUrls' instead of 'styleUrl'
})
export class SearchComponent {
  @Input() showContent: boolean = false;
  @Input() searchPlaceholder: string = 'Default';

  isFocused = false;

  constructor(private readonly searchStateService: SearchStateService) { }

  handleStateSearch(searchQuery: string) {
    console.log(`From Search-Book Component: ${searchQuery}`);
    this.searchStateService.updateSearch(searchQuery);
  }

}
