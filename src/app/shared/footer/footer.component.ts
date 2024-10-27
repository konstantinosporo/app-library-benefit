import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  socialsList: { title: string, icon: string, href: string }[] = [
    {
      title: "Facebook",
      icon: "bi bi-facebook",
      href: "https://www.facebook.com"
    },
    {
      title: "Twitter",
      icon: "bi bi-twitter-x",
      href: "https://www.twitter.com"
    },
    {
      title: "Google",
      icon: "bi bi-google",
      href: "https://www.google.com"
    },
    {
      title: "Instagram",
      icon: "bi bi-instagram",
      href: "https://www.instagram.com"
    },
    {
      title: "LinkedIn",
      icon: "bi bi-linkedin",
      href: "https://www.linkedin.com"
    },
    {
      title: "GitHub",
      icon: "bi bi-github",
      href: "https://www.github.com"
    }
  ];
}
