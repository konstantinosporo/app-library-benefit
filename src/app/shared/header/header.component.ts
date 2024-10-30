import { transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { slideInBounceFade, slideOutBounceFade } from './animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('toggleNavbar', [
      transition(':enter', [useAnimation(slideInBounceFade, { params: { time: '220ms' } })]),
      transition(':leave', [useAnimation(slideOutBounceFade, { params: { time: '250ms' } })]),
    ]),
  ],
})
export class HeaderComponent {
  navLinks = [
    { title: 'Dashboard', link: '/', icon: 'bi bi-activity me-1' },
    { title: 'Books', link: '/books', icon: 'bi bi-collection me-1' },
    { title: 'Reservations', link: '/reservations', icon: 'bi bi-journal-check me-1' },
    { title: 'Customers', link: '/customers', icon: 'bi bi-people me-1' },
  ];

  isNavbarCollapsed = true;
  isDarkTheme!: boolean;

  // inject rendered which is more of a better practice
  constructor(private readonly themeService: ThemeService) {
    this.themeService.isDarkThemeStream$.subscribe(isDarkTheme => this.isDarkTheme = isDarkTheme)
      ;
  }

  /**
   * @konstantinosporo
   * @description
   * Custom toggling for Bootstrap 5.3.3 navbar.
   * Since popper.js bugs with angulars libraries, 
   * i implemented my own toggler.
   */
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  /**
   * @konstantinosporo
   * @description
   * Simple toggle theme button.
   * Also changed the isDarkTheme boolean state.
   * @type {void}
   */
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
    const clickedInsideNavbar = target.closest('.navbar-collapse');
    const clickedToggleButton = target.closest('.navbar-toggler');

    // Close the navbar only if clicked outside the navbar and not on the toggle button
    if (!clickedInsideNavbar && !clickedToggleButton && !this.isNavbarCollapsed) {
      this.isNavbarCollapsed = true;
    }
  }

}
