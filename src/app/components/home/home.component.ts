import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   carouselItemList = [
    {
      label: 'First slide label',
      content: 'Some representative placeholder content for the first slide.',
      buttonText: 'Browse Library',
      imgSrc: '/home/home1.jpg'
    },
    {
      label: 'Second slide label',
      content: 'Some representative placeholder content for the second slide.',
      buttonText: 'News & Announcements',
      imgSrc: '/home/home2.jpg'
    },
    {
      label: 'Third slide label',
      content: 'Some representative placeholder content for the third slide.',
      buttonText: 'Register',
      imgSrc: '/home/home3.jpg'
    }
  ];

}
