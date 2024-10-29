import { DatePipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookApi } from '../../books/book/book';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { BookHttpService } from '../../services/book/book-http.service';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [BasicWrapperComponent, ReactiveFormsModule, NgIf, NgClass, NgFor, JsonPipe, DatePipe],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  categories: string[] = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography'];
  backButton: { title: string, route: string } = { title: 'Back to Books', route: '/books' };
  datePipe = new DatePipe('en-US');
  /**
   * @konstantinosporo
   * @description
   * Reactive Form. This variable holds a FormGroup.
   * Validations are given from the 2nd User Story.
   */
  bookFormControl = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    year: new FormControl(2024, [Validators.required, Validators.min(1900), Validators.max(2024)]),
    createdOn: new FormControl(this.formattedDateNow(), [Validators.required]),
    author: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    type: new FormControl('', Validators.required),
  });

  constructor(
    private readonly bookHttpService: BookHttpService,
    private readonly alertService: AlertService,
    private readonly router: Router) {
  }
  /**
   * @konstantinosporo
   * @description Triggers the alert service to print a success modal.
   */
  addBook() {
    //console.log(id);
    this.alertService.showSuccessModal('Confirm Creation', `Are you sure you want to create book with title: ${this.bookFormControl.controls['name'].value}`, () => this.confirmCreation(), "Add Book");
  }
  /**
   * @konstantinosporo
   * @description Triggered after confirming the action modal. Method to create a new BookApi object, and adding it
   *  in the API endpoint. It also uses alert service and global error service for outputing success and, error messages.
   */
  confirmCreation() {
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
      this.bookHttpService.addBook(newBook).subscribe({
        next: (book: BookApi) => {
          this.alertService.showSuccessToast(`Book with ID: ${book._id} successfully created!`);
          this.router.navigate(['books']);
        },
        error: (err) => {
          console.error('Error creating book:', err);
          if (err instanceof Error) {
            throw new Error(`Error creating book: ${err.message}`);
          } else {
            throw new Error('Error creating book.');
          }
        }
      });
    }
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

}
