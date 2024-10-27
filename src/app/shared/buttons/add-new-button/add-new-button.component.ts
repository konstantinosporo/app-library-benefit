import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './add-new-button.component.html',
  styleUrl: './add-new-button.component.css'
})
export class AddNewButtonComponent {
  @Input() textValue: string = '';
  @Input() rounded!: boolean;
  @Input() route: string = '';
  @Output() clickEvent: EventEmitter<string> = new EventEmitter<string>();

  handleClick(route: string) {
    this.clickEvent.emit(route);
  }
}
