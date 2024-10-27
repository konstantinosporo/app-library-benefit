import { Component } from '@angular/core';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { LibraryHttpService } from '../../services/library/library-http.service';
import { BookApi } from '../book/book';
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
  backButton: { title: string, route: string } = { title: 'Back to Library', route: '/library' };
  datePipe = new DatePipe('en-US');

  bookFormControl = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    year: new FormControl(2024, [Validators.required, Validators.min(1900), Validators.max(2024)]),
    createdOn: new FormControl(new Date(), Validators.required),
    author: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    type: new FormControl('', Validators.required),
  });

  constructor(private readonly bookHttpService: LibraryHttpService, private readonly alertService: AlertService) {
  }

  addBook() {
    //console.log(id);
    this.alertService.showSuccessModal('Confirm Creation', `Are you sure you want to create book with title: ${this.bookFormControl.controls['name'].value}`, () => this.confirmCreation(), "Add Book");
  }

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

  // This getter formats the date for the input field
  get formattedDate(): string {
    const dateValue = this.bookFormControl.get('createdOn')?.value;
    return dateValue ? this.datePipe.transform(dateValue, 'dd-MM-yyy') || '' : '';
  }

  // This function updates the FormControl when the input changes
  onDateChange(event: Event): void {
    const inputDate = new Date((event.target as HTMLInputElement).value);
    this.bookFormControl.get('createdOn')?.setValue(inputDate);
  }

}
