import { NgClass } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { DropdownActions } from './dropdown';

@Component({
  selector: 'app-actions-dropdown',
  standalone: true,
  imports: [NgClass],
  templateUrl: './actions-dropdown.component.html',
  styleUrl: './actions-dropdown.component.css'
})
export class ActionsDropdownComponent {
  @Input() dropdownActions!: DropdownActions[];
  isOpen = false; // State to track the dropdown

  toggleDropdown() {
    this.isOpen = !this.isOpen; // Toggle the dropdown state
  }

  closeDropdown() {
    this.isOpen = false; // Close the dropdown
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.closeDropdown();
    }
  }

}
