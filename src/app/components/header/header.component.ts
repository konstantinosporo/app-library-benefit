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
  navLinks = [
    {
      title: 'Home',
      link: '/home'
    },
    {
      title: 'Library',
      link: '/search-post'
    },
    {
      title: 'News',
      link: '/tasks'
    },
   
  ]
}
