import { Component, Input, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { PieChartData } from '../chart-pie/pieChartData';

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

  // collor pallete object
  private readonly colorPalette: { [key: string]: string } = {
    'Fiction': '#d99831',
    'Non-Fiction': '#B85450',
    'Biography': '#64A3B0',
    'Sci-Fi': '#8F7CA6'
  };
  // listen for changes from the parent
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.setChartOptions();
    }
  }

  // e-charts options configuration object
  setChartOptions() {
    // Map `type` to `name` for ECharts
    const formattedData = this.data.map(item => ({
      value: item.value,
      name: item.type,
      itemStyle: { color: this.colorPalette[item.type] || '' }
    }));

    this.options = {
      xAxis: {
        type: 'category',
        data: formattedData.map(item => item.name),
        name: 'Types',
        axisLabel: { interval: 0, rotate: 30 }
      },
      yAxis: {
        type: 'value',
        name: 'Book Availability'
      },
      backgroundColor: 'transparent',
      series: [
        {
          data: formattedData.map(item => ({
            value: item.value,
            name: item.name,
            itemStyle: item.itemStyle
          })),
          type: 'bar'
        }
      ]
    };
  }
}
