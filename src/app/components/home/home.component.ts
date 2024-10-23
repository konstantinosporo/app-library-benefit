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
      imageSrc: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Community Events',
      description: 'Join our reading clubs and author meetups.',
      imageSrc: 'https://images.pexels.com/photos/2090104/pexels-photo-2090104.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  onExploreClick() {
    console.log('Explore button clicked')
  }

}