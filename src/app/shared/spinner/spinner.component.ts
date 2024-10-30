import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  @Input() minVh?: string = 'min-vh-75';
  @Input() spinnerSize: { [key: string]: string } = {
    width: '3rem',
    height: '3rem'
  };
}
