import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-loan-menu',
  imports: [],
  templateUrl: './loan-menu.html',
  styleUrl: './loan-menu.css'
})
export class LoanMenu {
  @ViewChild('updatingLineChart') updatingLineChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: ['Feb', 'Jan', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [20, 40, 30, 50, 60, 70, 90, 80, 75, 85, 95, 100],
            backgroundColor: 'rgba(55,125,255, .5)',
            borderColor: '#377dff',
            borderWidth: 2,
            pointRadius: 0,
            pointBackgroundColor: '#377dff',
            pointBorderColor: '#fff',
            tension: 0.4
          },
          {
            label: 'Dataset 2',
            data: [10, 25, 35, 45, 55, 65, 70, 60, 80, 85, 90, 95],
            backgroundColor: 'rgba(0, 201, 219, .5)',
            borderColor: '#00c9db',
            borderWidth: 2,
            pointRadius: 0,
            pointBackgroundColor: '#00c9db',
            pointBorderColor: '#fff',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: {
              color: '#e7eaf3'
            },
            ticks: {
              stepSize: 20,
              callback: (value) => value + 'k',
              color: '#97a4af'
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#97a4af'
            }
          }
        },
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: (ctx) => '$' + ctx.raw + 'k'
            }
          },
          legend: {
            display: false
          }
        }
      }
    };

    this.chart = new Chart(this.updatingLineChart.nativeElement, config);

    // 🔥 Example auto-update (every 2s)
    setInterval(() => {
      this.chart.data.datasets.forEach(ds => {
        ds.data.push(Math.floor(Math.random() * 100));
        (ds.data as number[]).shift(); // keep length same
      });
      this.chart.update();
    }, 2000);
  }
}
