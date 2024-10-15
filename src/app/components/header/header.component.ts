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
      title: 'Posts',
      link: '/posts'
    },
    {
      title: 'Search Post',
      link: '/search-post'
    },
    {
      title: 'Tasks',
      link: '/tasks'
    },
    {
      title: 'Todos',
      link: '/todos'
    },
    {
      title: 'Products',
      link: '/products'
    }
  ]
}
