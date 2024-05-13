import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ChartComponent as Chart,
  NgApexchartsModule
} from "ng-apexcharts";
import {ThemeService} from "../../services/theme/theme.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {ChartService} from "../../services/chart/chart.service";
import {AppState} from "../../store/store";
import {Store} from "@ngrx/store";
import {GetBoardStatistic} from "../../store/chart/chart.actions";
import {getBoardsStatistic, getBoardsStatisticLoading} from "../../store/chart";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Subject, takeUntil} from "rxjs";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    NgApexchartsModule,
    AsyncPipe,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {
  @ViewChild("chart") chart!: Chart;
  chartOptions!: ChartOptions
  BSLoading!: boolean
  private destroyed$ = new Subject<null>()

  constructor(protected themeService: ThemeService, private chartService: ChartService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetBoardStatistic())
    this.store.select(getBoardsStatisticLoading).pipe(takeUntil(this.destroyed$)).subscribe(
      loading => {
        this.BSLoading = loading
      }
    )
    this.store.select(getBoardsStatistic).pipe(takeUntil(this.destroyed$)).subscribe(
      data => {
        this.chartOptions = {
          series: [
            {
              name: "Всего",
              data: data?.all || []
            },
            {
              name: "Выполнено",
              data: data?.done || []
            }
          ],
          chart: {
            type: "bar",
            height: 430
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          xaxis: {
            categories: data?.title || []
          }
        };
      }
    )
    this.themeService.theme$.pipe(takeUntil(this.destroyed$)).subscribe(theme => {
      this.chartOptions.chart!.foreColor = theme === 'dark-theme' ? '#f6f7f8' : '#373d3f'
      this.chartOptions.chart!.background = theme === 'dark-theme' ? '#424242' : '#00000000'
    })
  }
}
