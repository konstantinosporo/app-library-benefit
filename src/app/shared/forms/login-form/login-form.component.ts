import { Component } from '@angular/core';
import { CardWrapperComponent } from "../../wrappers/card-wrapper/card-wrapper.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CardWrapperComponent, ReactiveFormsModule, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private readonly router: Router) { }

  loginImageSrc: string = 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  loginError: string = '';

  registeredUser = [
    {
      email: 'konstantinosporo@hotmail.gr',
      password: '5550123'
    }
  ];

  loginFormControl = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  });

  handleLoginSubmit() {
    console.table(this.loginFormControl.value);
    if (this.registeredUser[0].email === this.loginFormControl.get('email')?.value && this.registeredUser[0].password === this.loginFormControl.get('password')?.value) {
      this.router.navigate(['/posts']);
    } else {
      this.loginError = 'Invalid credentials. Please try again.'
      this.router.navigate(['/login-form']);
    }
  }
}
