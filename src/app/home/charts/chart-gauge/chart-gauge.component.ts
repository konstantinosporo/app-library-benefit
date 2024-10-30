import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { CustomerApi } from '../../../customers/customer';
import { ReservationApi } from '../../../reservations/reservation';

@Component({
  selector: 'app-chart-gauge',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-gauge.component.html',
  styleUrls: ['./chart-gauge.component.css']
})
export class ChartGaugeComponent implements OnInit, OnChanges {
  @Input() data!: CustomerApi[] | ReservationApi[] | null;
  @Input() seriesName?: string;
  @Input() dataChartName?: string;
  @Input() theme?: boolean;
  @Input() color?: string;
  options!: EChartsOption;

  ngOnInit(): void {
    this.setChartOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theme']) {
      this.setChartOptions();
    }
  }

  private setChartOptions(): void {
    this.options = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      backgroundColor: 'transparent',
      series: [
        {
          name: this.seriesName || 'Gauge',
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}'
          },
          data: [
            {
              value: this.data?.length || 10,
              name: this.dataChartName || 'Gauge Data Title'
            }
          ],
          color: this.color || (this.theme ? '#0056b3' : '#0076F5')
        }
      ]
    };
  }
}
