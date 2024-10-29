import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { BookHttpService } from '../../services/book/book-http.service';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { BookApi } from '../book/book';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgClass, BasicWrapperComponent],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnDestroy {
  categories: string[] = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography'];
  backButton: { title: string, route: string } = { title: 'Back to Books', route: '/books' };
  bookFormControl = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    year: new FormControl(2024, [Validators.required, Validators.min(1900), Validators.max(2024)]),
    createdOn: new FormControl('', Validators.required),
    author: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    type: new FormControl('', Validators.required),
  });
  private readonly datePipe = new DatePipe('en-US');
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly bookHttpService: BookHttpService,
    private readonly alertService: AlertService,
    private readonly route: ActivatedRoute,
  ) {
    this.route.params.subscribe(param => {
      this.bookHttpService.getBookById(param['id']).subscribe((book) => {
        this.patchForm(book);
      });
    });
    
  }
  /**
   * @konstantinosporo
   * @description Triggers the alert service to print a success modal.
   */
  editBook() {
    //console.log(id);
    this.alertService.showInfoModal('Confirm Changes', `Are you sure you want to edit book with title: ${this.bookFormControl.controls['name'].value}`, () => this.confirmEdit(), "Edit Book");
  }
  /**
   * @konstantinosporo
   * @description Triggered after confirming the action modal. Method to create a new BookApi object, and adding it
   *  in the API endpoint. It also uses alert service and global error service for outputing success and, error messages.
   */
  confirmEdit() {
    //console.log(this.bookFormControl.value);
    // console.log(this.bookFormControl.controls['name']);
    if (this.bookFormControl.valid) {
      const newBook: BookApi = {
        name: this.bookFormControl.controls['name'].value as string,
        year: this.bookFormControl.controls['year'].value as number,
        createdOn: this.bookFormControl.controls['createdOn'].value
          ? new Date(this.bookFormControl.controls['createdOn'].value)
          : new Date(),
        author: this.bookFormControl.controls['author'].value as string,
        type: this.bookFormControl.controls['type'].value as string,
      };
      //console.table(newBook);
      this.bookHttpService.editBook(newBook).subscribe({
        next: (book: BookApi) => {
          this.alertService.showSuccessToast(`Book with ID: ${book._id} successfully edited!`);
        },
        error: (err) => {
          //console.error('Error editing book:', err); 
          if (err instanceof Error) {
            throw new Error(`Error editing book: ${err.message}`);
          } else {
            throw new Error('Error editing book.', err);
          }
        }
      });
    }
  }
  /**
   * @konstantinosporo
   * Method to update the value of the form when the data get fetched.
   * @param book 
   */
  patchForm(book: BookApi) {
    this.bookFormControl.patchValue({
      name: book.name,
      year: book.year,
      createdOn: this.datePipe.transform(book.createdOn, 'yyyy-MM-dd'),
      author: book.author,
      type: book.type,
    });
  }
  /**
 * @konstantinosporo
 * @description Sets the 'createdOn' date to NOW.
*/
  setTodayDate() {
    this.bookFormControl.controls['createdOn'].patchValue(this.formattedDateNow());
  }
  /**
   * @konstantinosporo
   * @description Format date for date inputs 'yyyy-MM-dd'
   */
  formattedDateNow(): string {
    return new Date().toISOString().split('T')[0];
  }
  /**
   * @konstantinosporo
   * @description Checks if the passed date string is equal to today. (NOT COMPARING HOURS);
   * @param dateString 
   * @returns 
   */
  isDateToday(dateString: string): boolean {
    const selectedDate = new Date(dateString);
    const today = new Date();

    // i dont need to compare hours
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate.getTime() === today.getTime();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
