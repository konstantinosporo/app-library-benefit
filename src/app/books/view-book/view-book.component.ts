import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
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
export class ViewBookComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  backButton: { title: string, route: string } = { title: 'Back', route: '/books' };
  categories: string[] = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography'];
  bookId: string = '';
  bookToView$!: Observable<BookApi>;
  // Subscribe in the params on component mount.
  // Also using takeUntil() as im manually subscribe here.
  constructor(
    private readonly bookHttpService: BookHttpService,
    private readonly route: ActivatedRoute
  ) {
    // Ensuring manual unsubscription on destroy.
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(param => this.bookId = param['id'] || '');
    if (this.bookId.length) {
      //console.log(this.bookId);
      this.bookToView$ = this.bookHttpService.getBookById(this.bookId);
    }
  }
  /**
  * @konstantinosporo
  * @description Catching the ng destroy hook to terminate subsriptions on destroy.
  */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
