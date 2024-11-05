import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-basic-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './basic-wrapper.component.html',
  styleUrl: './basic-wrapper.component.css'
})
export class BasicWrapperComponent {
  @Input() title?: string = '';
  @Input() iconClass?: string = '';
  @Input() showTitleIcon?: boolean = true;
  @Input() titleFooter?: string = '';
  @Input() docId?: string;
  @Input() footer?: string = '';
  @Input() backButton?: { title: string, route: string }

  constructor(
    private readonly router: Router,
    private readonly location: Location,
  ) { }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate([this.backButton?.route]);
    }
  }
}
