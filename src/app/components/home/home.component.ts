import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureItemComponent } from '../../shared/feature-item/feature-item.component';
import { CtaButtonComponent } from '../../shared/cta-button/cta-button.component';
import { CarouselComponent } from '../../shared/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FeatureItemComponent, CtaButtonComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  carouselImages = [
    { src: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=350', alt: 'Library Image 1' },
    { src: 'https://images.pexels.com/photos/904620/pexels-photo-904620.jpeg?auto=compress&cs=tinysrgb&w=350', alt: 'Library Image 2' },
    { src: 'https://images.pexels.com/photos/2090104/pexels-photo-2090104.jpeg?auto=compress&cs=tinysrgb&w=350', alt: 'Library Image 3' }
  ];

  features = [
    {
      title: 'Online Reservations',
      description: 'Reserve books online and pick them up at your convenience.',
      imageSrc: 'https://www.christiesrealestate.com/blog/wp-content/uploads/2015/09/iStock_000015100700.jpg'
    },
    {
      title: 'Community Events',
      description: 'Join our reading clubs and author meetups.',
      imageSrc: 'https://img.freepik.com/premium-photo/young-adults-engaged-lively-discussion-library-fostering-inclusivity-collaboration-diverse-friends-afternoon_1247367-69500.jpg'
    }
  ]

  onExploreClick() {
    console.log('Explore button clicked')
  }

}
