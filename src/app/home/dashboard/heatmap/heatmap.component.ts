import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { Observable } from 'rxjs';
import { HeatMapData } from '../../../services/reservations/charts';
import { ReservationHttpService } from '../../../services/reservations/reservation-http.service';
import { ThemeService } from '../../../services/theme/theme.service';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { ChartHeatmapComponent } from "../../charts/chart-heatmap/chart-heatmap.component";

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [NgxEchartsDirective, SpinnerComponent, AsyncPipe, ChartHeatmapComponent],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.css'
})
export class HeatmapComponent {
  options!: EChartsOption;
  // reservations$!: Observable<BookApi[]>;
  dataStream$!: Observable<HeatMapData>;
  isDarkTheme!: boolean;

  constructor(
    private readonly reservationHttpService: ReservationHttpService,
    private readonly themeService: ThemeService,

  ) { }

  ngOnInit(): void {
    this.dataStream$ = this.reservationHttpService.getReservationsByDay();
    this.themeService.isDarkThemeStream$.subscribe(isDarkTheme => this.isDarkTheme = isDarkTheme);
  }


}
