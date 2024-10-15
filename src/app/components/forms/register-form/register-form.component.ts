import { Component } from '@angular/core';
import { CardWrapperComponent } from "../../card-wrapper/card-wrapper.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CardWrapperComponent, ReactiveFormsModule, NgClass],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  registerImageSrc: string = 'https://images.pexels.com/photos/1106468/pexels-photo-1106468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  registerFormControl = new FormGroup({
    fullName: new FormControl('',[Validators.minLength(2),Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6),Validators.required])
  });

  handleRegisterSubmit() {
      console.table(this.registerFormControl.value);
  }
}
