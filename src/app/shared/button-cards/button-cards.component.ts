import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-cards',
  standalone: true,
  imports: [],
  templateUrl: './button-cards.component.html',
  styleUrl: './button-cards.component.css'
})

export class ButtonCards {
  @Input() text: string = 'Click me';
  @Output() onclick = new EventEmitter<void>();

  handleClick() {
    this.onclick.emit();
  }
}