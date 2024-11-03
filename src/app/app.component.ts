import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { FooterComponent } from "./shared/footer/footer.component";
import { GlobalAlertsComponent } from "./shared/global-alerts/global-alerts.component";
import { HeaderComponent } from "./shared/header/header.component";
import { ScrollToTopButtonComponent } from "./shared/buttons/scroll-to-top-button/scroll-to-top-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GlobalAlertsComponent,
    NgxEchartsDirective,
    RouterOutlet,
    ScrollToTopButtonComponent
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
