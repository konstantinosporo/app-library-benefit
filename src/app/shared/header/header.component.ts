import { transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
export class HeaderComponent implements OnInit {
  navLinks = [
    { title: 'Home', link: '/', icon: 'bi bi-house me-1' },
    //{ title: 'Library', link: '/library', icon: 'bi bi-collection me-1' },
    { title: 'Books', link: '/books', icon: 'bi bi-collection me-1' },
    { title: 'Reservations', link: '/reservations', icon: 'bi bi-journal-check me-1' },
    { title: 'Customers', link: '/customers', icon: 'bi bi-people me-1' },
  ];

  isNavbarCollapsed = true;
  isDarkTheme = false;

  // inject rendered which is more of a better practice
  constructor(private readonly renderer: Renderer2) { }
  // load the theme on init to avoid differs with the current theme
  ngOnInit() {
    this.loadThemePreference();
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
    this.isDarkTheme = !this.isDarkTheme;
    this.updateTheme();
  }
  /**
   * @konstantinosporo
   * @description
   * Checks if the theme is dark.
   * Updates the theme with rendered (could do it with document.body.classlist.toggle).
   * But this is the angulara way given the docs.
   * Totally removes .dark css classes.
   * @type {void}
   */
  private updateTheme() {
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
      localStorage.setItem('theme', 'light');
    }
  }
  /**
   * @konstantinosporo
   * Gathers the previous Local Storage theme from the disk.
   * Checks if the theme is dark.
   * Updates the current theme.
   * @type {void}
   */
  private loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.updateTheme();
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
