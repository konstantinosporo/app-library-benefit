import { Component, Input, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PieChartData } from '../chart-pie/pieChartData';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-chart-bar',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-bar.component.html',
  styleUrl: './chart-bar.component.css'
})
export class ChartBarComponent {
  @Input() data!: PieChartData[];
  @Input() theme?: boolean;
  @Input() color?: string;
  options!: EChartsOption;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.setChartOptions();
    }
  }
  
  setChartOptions() {
    // Map `type` to `name` for ECharts
    const formattedData = this.data.map(item => ({
      value: item.value,
      name: item.type
    }));

    this.options = {
      xAxis: {
        type: 'category',
        data: formattedData.map(item => item.name),
        name: 'Types'
      },
      yAxis: {
        type: 'value',
        name: 'Availability'
      },
      backgroundColor: 'transparent',
      series: [
        {
          data: formattedData.map(item => item.value),
          type: 'bar'
        }
      ]
    };
  }
}
