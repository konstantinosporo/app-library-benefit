import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-ssr-button',
  standalone: true,
  imports: [],
  templateUrl: './toggle-ssr-button.component.html',
  styleUrl: './toggle-ssr-button.component.css'
})
export class ToggleSsrButtonComponent {
  @Input() ssrMode!: boolean;
  @Output() handleToggleEvent: EventEmitter<void> = new EventEmitter<void>();

  handleToggle() {
    this.handleToggleEvent.emit();
  }
}
