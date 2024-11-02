import { TestBed } from '@angular/core/testing';

import { SearchStateService } from './search-state.service';
import { first, take } from 'rxjs';
import { FilterID } from '../shared/search/filter/filters';

describe('SearchStateService', () => {
  let service: SearchStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateSearch', () => {
    it('should update the searchSubject with the provided search query', (done) => {
      // mock search string
      const newSearchQuery = 'new search terms';
      // mock subsribing to the searchStream$
      service.searchStream$.pipe(
        first((searchQuery) => searchQuery === newSearchQuery),
        take(1) // i take only 1 to unsubscribe after that
      ).subscribe((searchQuery) => {
        expect(searchQuery).toBe(newSearchQuery);
        done();
      });

      service.updateSearch(newSearchQuery);
    });
  });

  describe('updateFilter', () => {
    it('should update the filterSubject with the provided filter ID', (done) => {
      // mock filter id
      const newFilterId = FilterID.AVAILABLE;
      // mock sub to the filterStream$
      service.filterStream$.pipe(
        first((filterId) => filterId === newFilterId),
        take(1)
      ).subscribe((filterId) => {
        expect(filterId).toBe(newFilterId);
        done();
      });

      service.updateFilter(newFilterId);
    });
  });
});
