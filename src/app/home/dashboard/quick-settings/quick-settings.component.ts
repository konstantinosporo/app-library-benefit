import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookHttpService } from '../../../services/book/book-http.service';
import { ThemeService } from '../../../services/theme.service';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { ChartPieComponent } from "../../charts/chart-pie/chart-pie.component";
import { PieChartData } from '../../charts/chart-pie/pieChartData';

@Component({
  selector: 'app-quick-settings',
  standalone: true,
  imports: [ChartPieComponent, AsyncPipe, SpinnerComponent, JsonPipe],
  templateUrl: './quick-settings.component.html',
  styleUrl: './quick-settings.component.css'
})
export class QuickSettingsComponent {
  isDarkTheme!: boolean;
  dataStream$!: Observable<PieChartData[]>;

  constructor(
    private readonly bookHttpService: BookHttpService,
    private readonly themeService: ThemeService,
  ) {
    this.dataStream$ = this.bookHttpService.getAvailableBooksCountByType();
    this.themeService.isDarkThemeStream$.subscribe(isDarkTheme => this.isDarkTheme = isDarkTheme);

  }
}
