import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { HeatMapData } from '../../../services/reservations/charts';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
@Component({
  selector: 'app-chart-heatmap',
  standalone: true,
  imports: [NgxEchartsDirective, SpinnerComponent],
  templateUrl: './chart-heatmap.component.html',
  styleUrl: './chart-heatmap.component.css'
})
export class ChartHeatmapComponent implements OnInit, OnChanges {
  @Input() data!: HeatMapData;
  @Input() seriesName?: string;
  @Input() dataChartName?: string;
  @Input() theme?: boolean;
  @Input() color?: string;
  options!: EChartsOption;

  // initialize the e-charts config on init
  ngOnInit(): void {
    this.setChartOptions();
  }
  // listen for theme changes from the parent
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme']) {
      this.setChartOptions();
    }
  }
  // e-charts options configuration object
  private setChartOptions(): void {
    this.options = {
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: this.data.days,
        name: 'Day',
        axisLabel: { interval: 0, rotate: 30 }
      },
      yAxis: {
        type: 'category',
        data: ['Total Reservations'],
        name: 'Reservations',
        axisLabel: { interval: 0, rotate: 90 }

      },
      visualMap: {
        min: Math.min(...this.data.counts),
        max: Math.max(...this.data.counts),
        calculable: true,
        inRange: {
          color: ['#F2F2F2', '#00233D']
        }
      },
      backgroundColor: 'transparent',
      series: [
        {
          name: 'Total Reservations by Day',
          type: 'heatmap',
          data: this.data.days.map((day, index) => [day, 'Total Reservations', this.data.counts[index] || 0]),
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          }
        }
      ]
    };
  }


}