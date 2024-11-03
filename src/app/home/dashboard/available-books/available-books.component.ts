import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookApi } from '../../../books/book/book';
import { BookHttpService } from '../../../services/book/book-http.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-available-books',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './available-books.component.html',
  styleUrl: './available-books.component.css'
})
export class AvailableBooksComponent {
  private readonly allAvailableBooks$!: Observable<(BookApi | undefined)[]>;
  availableBooks$!: Observable<(BookApi | undefined)[]>;

  constructor(private readonly bookHttpService: BookHttpService) {
    this.allAvailableBooks$ = this.bookHttpService.getAvailableBooks();
    this.availableBooks$ = this.allAvailableBooks$;
  }
}
