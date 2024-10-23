import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  /**
   * @konstantinosporo
   * @description
   * A simple array with navlink object.
   * Adjusting this array, will update the actual links.
   */
  navLinks = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Library',
      link: '/library'
    },
    {
      title: 'Reservations',
      link: '/reservations'
    },
    {
      title: 'Customers',
      link: '/customers'
    },
  ]
}
