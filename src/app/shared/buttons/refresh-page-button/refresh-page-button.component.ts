import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-refresh-page-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './refresh-page-button.component.html',
  styleUrl: './refresh-page-button.component.css'
})
export class RefreshPageButtonComponent {
  @Input() rounded: boolean = false;
  @Output() handleRefreshEvent: EventEmitter<void> = new EventEmitter<void>();

  handleClick() {
    this.handleRefreshEvent.emit();
  }
}
