import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './basic-wrapper.component.html',
  styleUrl: './basic-wrapper.component.css'
})
export class BasicWrapperComponent {
  @Input() title?: string = '';
  @Input() titleFooter?: string = '';
  @Input() footer?: string = '';
}
