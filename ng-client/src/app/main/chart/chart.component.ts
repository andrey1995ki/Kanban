import {Component, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent as Chart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke, NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @ViewChild("chart") chart!: Chart;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "serie1",
          data: [44, 55, 41, 64, 22, 43, 21]
        },
        {
          name: "serie2",
          data: [53, 32, 33, 52, 13, 44, 32]
        },
        {
          name: "serie3",
          data: [53, 0, 0, 0, 13, 0, 32]
        }
      ],
      chart: {
        type: "bar",
        height: 430,
        foreColor: 'white'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#5e0404"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#412f2f"]
      },
      xaxis: {
        categories: ['test one board', 'test two board 2', 2003, 2004, 2005, 2006, 2007]
      }
    };
  }
}
