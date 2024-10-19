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
  
   handleClick(id: string, action: string) {
    console.log(id);
    // TODO ADD THE LOGIC FOR BUTTON CLICKS CAN USE SWITCH TO ALSO GET SWITCH FUNCTIONALITIES
    switch (action) {
      case 'view':
        console.log('I have clicked the view button');
        break;
      case 'edit':
        console.log('I have clicked the edit button');
        break;
      case 'delete':
        console.log('I have clicked the delete button');
        break;
      default: break;
    }
  }
}
