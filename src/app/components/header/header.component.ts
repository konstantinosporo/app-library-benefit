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

  constructor(private readonly renderer: Renderer2) { }

  ngOnInit() {
    this.loadThemePreference();
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.updateTheme();
  }

  private updateTheme() {
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
      localStorage.setItem('theme', 'light');
    }
  }

  private loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.updateTheme();
  }
}
