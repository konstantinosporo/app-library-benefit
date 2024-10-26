import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-wrapper',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-wrapper.component.html',
  styleUrl: './card-wrapper.component.css'
})
export class CardWrapperComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageSrc: string = '';
  @Input() imgAlt: string = '';
}
