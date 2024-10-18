import { Component, Input } from '@angular/core';
import { BookApi } from '../../library/book/book';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-books-carousel',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './books-carousel.component.html',
  styleUrl: './books-carousel.component.css'
})
export class BooksCarouselComponent {
  @Input() availableBookList!: BookApi[][];
}
