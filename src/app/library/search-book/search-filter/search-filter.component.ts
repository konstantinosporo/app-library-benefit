import { Component, Input } from '@angular/core';
import { SearchStateService } from '../../../services/search-state.service';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
  constructor(private readonly searchStateService: SearchStateService) { }

  @Input() id: string = '';
  @Input() title: string = '';
  @Input() checked: boolean = false;

  handleStateFilter(id: string) {
    //console.log(id);
    this.searchStateService.updateFilter(id);
  }
}
