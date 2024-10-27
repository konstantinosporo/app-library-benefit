import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [],
  templateUrl: './cta-button.component.html',
  styleUrl: './cta-button.component.css'
})
export class CtaButtonComponent {
  @Input() text: string = 'Click me';
  @Output() onclick = new EventEmitter<void>();

  handleClick() {
    this.onclick.emit();
  }
}
