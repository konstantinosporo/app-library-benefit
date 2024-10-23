import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-item',
  standalone: true,
  imports: [],
  templateUrl: './feature-item.component.html',
  styleUrl: './feature-item.component.css'
})
export class FeatureItemComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageSrc: string = '';
}
