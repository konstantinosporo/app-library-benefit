import { Component, Input } from '@angular/core';
import { CtaButtonComponent } from "../cta-button/cta-button.component";
import { ButtonCards } from "../button-cards/button-cards.component";

@Component({
  selector: 'app-feature-item',
  standalone: true,
  imports: [CtaButtonComponent, ButtonCards],
  templateUrl: './feature-item.component.html',
  styleUrl: './feature-item.component.css'
})
export class FeatureItemComponent {
onExploreClick() {
throw new Error('Method not implemented.');
}
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageSrc: string = ''; 
  // imageUrl: any;
}
