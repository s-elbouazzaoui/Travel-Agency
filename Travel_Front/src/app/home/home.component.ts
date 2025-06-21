import {Component, ViewChild} from '@angular/core';
import {ButtonBookingComponent} from '../../lib/button-booking/button-booking.component';
import {RouterModule} from '@angular/router';
import {ApexChart, ApexNonAxisChartSeries, ApexPlotOptions, ChartComponent, NgApexchartsModule} from 'ng-apexcharts';
import {UserSideBarComponent} from '../../lib/user-side-bar/user-side-bar.component';



export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    NgApexchartsModule,
    UserSideBarComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})



export class HomeComponent {

  contentMove=false
  @ViewChild("chart") chart: ChartComponent |undefined ;
  public chartOptions: ChartOptions;
  public chartOptions2:ChartOptions

  constructor() {
    this.chartOptions = {
      series: [44, 55, 67, 83],
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total",
              formatter: function(w) {
                return "249";
              }
            }
          }
        }
      },
      labels: ["CANADA", "ITALY", "MOROCCO", "SWEDEN"]
    };




  this.chartOptions2 = {
    series: [70],
    chart: {
      height: 350,
      type: "radialBar"
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%"
        }
      }
    },
    labels: ["45% on 8 places"]
  };
}

}
