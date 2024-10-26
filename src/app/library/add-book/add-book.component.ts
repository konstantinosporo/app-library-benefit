import { Component } from '@angular/core';
import { BasicWrapperComponent } from "../../shared/wrappers/basic-wrapper/basic-wrapper.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [BasicWrapperComponent, ReactiveFormsModule, NgIf, NgClass, NgFor, JsonPipe],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  categories: string[] = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography'];
  bookFormControl = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    year: new FormControl(2024, [Validators.required, Validators.min(1900), Validators.max(2024)]),
    createdOn: new FormControl(new Date(), Validators.required),
    author: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    type: new FormControl('', Validators.required),
  });

  handleSave() {
    console.log(this.bookFormControl.value);
  }
}
