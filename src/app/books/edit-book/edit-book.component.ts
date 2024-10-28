import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert-handlers/alert.service';
import { LibraryHttpService } from '../../services/library/library-http.service';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { BookApi } from '../book/book';
import { Subject } from 'rxjs';

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
  bookId: string = '';
  bookFormControl = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    year: new FormControl(2024, [Validators.required, Validators.min(1900), Validators.max(2024)]),
    createdOn: new FormControl(new Date(), Validators.required),
    author: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    type: new FormControl('', Validators.required),
  });
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly bookHttpService: LibraryHttpService,
    private readonly alertService: AlertService,
    private readonly route: ActivatedRoute,
  ) {
    this.route.params.subscribe(param => this.bookId = param['id'] || '');
    if (this.bookId.length) {
      //console.log(this.bookId);
      this.bookHttpService.getBookById(this.bookId).subscribe((book) => {
        this.bookFormControl.patchValue({
          name: book.name,
          year: book.year,
          createdOn: book.createdOn,
          author: book.author,
          type: book.type,
        });
      });

    }
  }
  /**
   * @konstantinosporo
   * @description Triggers the alert service to print a success modal.
   */
  editBook() {
    //console.log(id);
    this.alertService.showInfoModal('Confirm Changes', `Are you sure you want to edit book with title: ${this.bookFormControl.controls['name'].value}`, () => this.confirmEdit(), "Add Book");
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
        createdOn: this.bookFormControl.controls['createdOn'].value as Date,
        author: this.bookFormControl.controls['author'].value as string,
        type: this.bookFormControl.controls['type'].value as string,
      };
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
