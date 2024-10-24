import { Component, Input } from '@angular/core';

import { DatePipe } from '@angular/common';
import { BookApi } from '../../../../library/book/book';

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
