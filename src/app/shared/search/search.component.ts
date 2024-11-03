import { Component, Input, OnInit, HostListener } from '@angular/core';
import { SearchStateService } from '../../services/search-state.service';
import { AddNewButtonComponent } from "../buttons/add-new-button/add-new-button.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AddNewButtonComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] // Note: Fix this to 'styleUrls' instead of 'styleUrl'
})
export class SearchComponent implements OnInit {
  @Input() showContent: boolean = false;
  @Input() searchPlaceholder: string = 'Default';
  private dynamicPlaceholder: string = 'Type Keywords'; // New dynamic placeholder

  isFocused = false;

  constructor(private readonly searchStateService: SearchStateService) { }

  ngOnInit() {
    this.checkScreenSize(); // Check screen size on initialization
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize(); // Check screen size on window resize
  }

  handleStateSearch(searchQuery: string) {
    console.log(`From Search-Book Component: ${searchQuery}`);
    this.searchStateService.updateSearch(searchQuery);
  }

  checkScreenSize() {
    this.dynamicPlaceholder = window.innerWidth < 576 ? '' : this.searchPlaceholder; // Use the input value or set to empty
  }

  get placeholder() {
    return this.dynamicPlaceholder; // Getter to use in the template
  }
}
