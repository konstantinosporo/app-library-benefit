import { DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookApi } from './book';

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
   * @description An input binding that accepts a list of Book objects;
   */
  @Input() book!: BookApi;
  @Input() imgUrl!: string;

  @Output() handleClickEvent: EventEmitter<string[]> = new EventEmitter<string[]>();
  /**
   * @konstantinosporo
   * @description Emit both id of item clicked AND the preferable action.
   */
  handleClick(id: string, action: string) {
    this.handleClickEvent.emit([id, action]);
  }
}
