import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookHttpService } from '../../services/book/book-http.service';
import { SpinnerComponent } from "../../shared/spinner/spinner.component";
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { BookApi } from '../book/book';

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
  backButton: { title: string, route: string } = { title: 'Back to Books', route: '/books' };
  datePipe = new DatePipe('en-US');
  bookToView$!: Observable<BookApi>;

  constructor(
    private readonly bookHttpService: BookHttpService,
    private readonly route: ActivatedRoute
  ) {
    this.route.params.subscribe(param => this.bookId = param['id'] || '');
    if (this.bookId.length) {
      //console.log(this.bookId);
      this.bookToView$ = this.bookHttpService.getBookById(this.bookId);
    }
  }

  /**
   * @konstantinosporo
   * This method will be deprecated, or be remade as a pipe on its own.
   */
  get formattedDate(): string {
    //const dateValue = this.bookFormControl.get('createdOn')?.value;
    //return dateValue ? this.datePipe.transform(dateValue, 'dd-MM-yyy') || '' : '';
    return 'alekos';
  }



}
