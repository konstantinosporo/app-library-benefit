import { Component, Input } from '@angular/core';
import { SearchStateService } from '../../../services/search-state.service';
import { FilterID } from './filters';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  constructor(private readonly searchStateService: SearchStateService) { }
  @Input() filterId!: FilterID;
  @Input() title: string = '';
  @Input() checked: boolean = false;

  // handleStateFilter(id: FilterID) {
  //   console.log(id);
  //   this.searchStateService.updateFilter(id);
  // }
}
