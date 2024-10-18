import { Component, Input } from '@angular/core';
import { Book, BookApi } from './book';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  /**
   * @konstantinosporo
   * @description
   * An input binding that accepts a list of Book objects;
   * @type {Book[ ]}
   */
@Input() bookList: BookApi[] = [];
}
