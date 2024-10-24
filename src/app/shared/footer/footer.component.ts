import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  iconsList: string[] = [
    "bi bi-facebook",
    "bi bi-twitter-x",
    "bi bi-google",
    "bi bi-instagram",
    "bi bi-linkedin",
    "bi bi-github"
  ]
}
