import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  /**
   * @konstantinosporo
   * @description
   * Created two BehaviorSubjects for capturing state.
   * By using this Class the values can be updated, 
   * whenever the state is changed.
   */
  searchSubject = new BehaviorSubject<string>('');
  // Transforing the subjects into observable streams
  searchStream$ = this.searchSubject.asObservable();

  // update state methods
  updateSearch(searchQuery: string) {
    //console.log(searchQuery);
    this.searchSubject.next(searchQuery);
  }

  resetSearch(): void {
    this.searchSubject.next('');
  }
}
