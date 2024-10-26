import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-button',
  standalone: true,
  imports: [],
  templateUrl: './add-new-button.component.html',
  styleUrl: './add-new-button.component.css'
})
export class AddNewButtonComponent {
  @Input() textValue: string = '';
  @Input() borderRadius: string = '';
  @Output() clickEvent: EventEmitter<void> = new EventEmitter();

  handleClick() {
    this.clickEvent.emit();
  }
}
