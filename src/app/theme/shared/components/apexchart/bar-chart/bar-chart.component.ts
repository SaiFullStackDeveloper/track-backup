// angular import
import { Component, ViewChild } from '@angular/core';

// third party
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-bar-chart',
  imports: [NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ApexOptions>;


  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "2025",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "2026",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "2027",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: "bar",
        height: 370
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 6,  // ✅ replaces 'endingShape: rounded'
          borderRadiusApplication: 'end'  // optional for a round end
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '11px',
          fontWeight: 600,
          colors: ['#ffffff']
        },
        offsetY: -5,
        formatter: function(val) {
          return val.toString();
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ],
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500,
            colors: ['#2c3e50']
          }
        }
      },
      yaxis: {
        title: {
          text: "Number Records",
          style: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#2c3e50'
          }
        },
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500,
            colors: ['#2c3e50']
          },
          formatter: function(val) {
            return Math.floor(val).toString();
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "" + val + " Items";
          }
        }
      }
    };
  }
}
