import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { PieChartData } from './pieChartData';
import { NgxEchartsDirective } from 'ngx-echarts';

@Component({
  selector: 'app-chart-pie',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnChanges {
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
          name: 'Book Type',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 3,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: formattedData,  // Use the formatted data
        }
      ]
    };
  }
}
