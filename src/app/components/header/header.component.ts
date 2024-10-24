import { transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fadeIn, fadeOut } from './animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('toggleNavbar', [
      transition(':enter', [useAnimation(fadeIn, { params: { time: '300ms' } })]),
      transition(':leave', [useAnimation(fadeOut, { params: { time: '300ms' } })]),
    ]),
  ],
})
export class HeaderComponent {
  navLinks = [
    { title: 'Home', link: '/' },
    { title: 'Library', link: '/library' },
    { title: 'Reservations', link: '/reservations' },
    { title: 'Customers', link: '/customers' },
  ];

  isNavbarCollapsed = true;
  isNavbarVisible = false;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.isNavbarVisible = !this.isNavbarCollapsed; // This ensures proper handling for visibility
  }
}
