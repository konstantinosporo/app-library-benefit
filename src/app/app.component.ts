import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { GlobalAlertsComponent } from "./shared/global-alerts/global-alerts.component";
import { HeaderComponent } from "./shared/header/header.component";
import { CarouselComponent } from './shared/carousel/carousel.component';
import { provideEcharts, NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppComponent,
    RouterOutlet,
    GlobalAlertsComponent,
    NgxEchartsDirective,
    HeaderComponent,
    CarouselComponent,
    FooterComponent,
  ],
  providers: [provideEcharts()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = 'app-library';

  handleClick() {
    throw new Error('Here is the error message displayed!');
  }

}
