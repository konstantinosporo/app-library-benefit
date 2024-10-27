import { Component, Input } from '@angular/core';
import { SearchStateService } from '../../../services/search-state.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  constructor(private readonly searchStateService: SearchStateService) { }

  @Input() id: string = '';
  @Input() title: string = '';
  @Input() checked: boolean = false;

  handleStateFilter(id: string) {
    //console.log(id);
    this.searchStateService.updateFilter(id);
  }
}
