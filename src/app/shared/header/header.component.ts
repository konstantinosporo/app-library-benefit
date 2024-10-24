import { Component, Renderer2, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { transition, trigger, useAnimation } from '@angular/animations';
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
export class HeaderComponent implements OnInit {
  navLinks = [
    { title: 'Home', link: '/' },
    { title: 'Library', link: '/library' },
    { title: 'Reservations', link: '/reservations' },
    { title: 'Customers', link: '/customers' },
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
}
