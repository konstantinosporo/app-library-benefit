import { Component } from '@angular/core';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { LibraryHttpService } from '../../services/library/library-http.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookApi } from '../book/book';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [BasicWrapperComponent, AsyncPipe, JsonPipe, DatePipe, SpinnerComponent],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css'
})
export class ViewBookComponent {
  bookId: string = '';
  categories: string[] = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography'];
  backButton: { title: string, route: string } = { title: 'Back to Library', route: '/library' };
  datePipe = new DatePipe('en-US');
  bookToView$!: Observable<BookApi>;

  constructor(private readonly libraryHttpService: LibraryHttpService, private readonly route: ActivatedRoute) {
    this.route.params.subscribe(param => this.bookId = param['id'] || '');
    if (this.bookId.length) {
      console.log(this.bookId);
      this.bookToView$ = this.libraryHttpService.getBookById(this.bookId);
    }
  }

  // This getter formats the date for the input field
  get formattedDate(): string {
    //const dateValue = this.bookFormControl.get('createdOn')?.value;
    //return dateValue ? this.datePipe.transform(dateValue, 'dd-MM-yyy') || '' : '';
    return 'alekos';
  }



}