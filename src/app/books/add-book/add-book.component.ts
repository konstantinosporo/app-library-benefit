import { Component } from '@angular/core';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { LibraryHttpService } from '../../services/library/library-http.service';
import { BookApi } from '../../books/book/book';
import { AlertService } from '../../services/alert-handlers/alert.service';

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
    createdOn: new FormControl(new Date(), Validators.required),
    author: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    type: new FormControl('', Validators.required),
  });

  constructor(private readonly bookHttpService: LibraryHttpService, private readonly alertService: AlertService) {
  }
  /**
   * @konstantinosporo
   * @description
   * Triggers the alert service to print a success modal.
   * @type {void}
   */
  addBook() {
    //console.log(id);
    this.alertService.showSuccessModal('Confirm Creation', `Are you sure you want to create book with title: ${this.bookFormControl.controls['name'].value}`, () => this.confirmCreation(), "Add Book");
  }
  /**
   * @konstantinosporo
   * @description
   * Triggered after confirming the action modal.
   * Method to create a new BookApi object, and adding it in the API endpoint.
   * It also uses alert service and global error service for outputing success and,
   * error messages.
   * @type {void}
   */
  confirmCreation() {
    //console.log(this.bookFormControl.value);
    // console.log(this.bookFormControl.controls['name']);
    if (this.bookFormControl.valid) {
      const newBook: BookApi = {
        name: this.bookFormControl.controls['name'].value as string,
        year: this.bookFormControl.controls['year'].value as number,
        createdOn: this.bookFormControl.controls['createdOn'].value as Date,
        author: this.bookFormControl.controls['author'].value as string,
        type: this.bookFormControl.controls['type'].value as string,
      };
      this.bookHttpService.addBook(newBook).subscribe({
        next: (book: BookApi) => {
          this.alertService.showSuccessToast(`Book with ID: ${book._id} successfully created!`);
        },
        error: (err) => {
          console.error('Error creating book:', err); // Log full error
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
   * @description
   * Attempt to transform the text inside the Reactive Form input.
   * For now it does NOT work as expected.
   * THIS METHOD WILL CHANGE OR GET DELETED!
   */
  get formattedDate(): string {
    const dateValue = this.bookFormControl.get('createdOn')?.value;
    return dateValue ? this.datePipe.transform(dateValue, 'dd-MM-yyy') || '' : '';
  }
  /**
   * @konstantinosporo
   * @description
   * This method attempts to change the input of the Date.
   * For now it does NOT work as expected.
   * THIS METHOD WILL CHANGE OR GET DELETED!
   * @param event 
   */
  onDateChange(event: Event): void {
    const inputDate = new Date((event.target as HTMLInputElement).value);
    this.bookFormControl.get('createdOn')?.setValue(inputDate);
  }

}
