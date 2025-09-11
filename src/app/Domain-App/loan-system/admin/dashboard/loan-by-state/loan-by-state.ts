import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-loan-by-state',
  standalone: true,
  template: `
    <div class="card-body" style="height: 350px;">
      <div class="chartjs-custom" style="height: 100%;">
        <canvas #referralsCanvas></canvas>
      </div>
    </div>
  `
})
export class LoanByState {
  @ViewChild('referralsCanvas') referralsCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const ctx = this.referralsCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            data: [200, 300, 290, 350, 150, 350, 300, 100, 125, 220, 390, 220],
            backgroundColor: '#377dff',
            borderColor: '#377dff',
            hoverBackgroundColor: '#377dff',
            maxBarThickness: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // ✅ prevents shrinking
        scales: {
          y: {
            border: {
              display: false // ✅ correct for Chart.js v4
            },
            grid: {
              color: '#e7eaf3'
            },
            ticks: {
              stepSize: 100,
              color: '#97a4af',
              padding: 10,
              callback: (value) => value + '$'
            }
          },
          x: {
            border: {
              display: false
            },
            grid: {
              display: false
            },
            ticks: {
              color: '#97a4af',
              padding: 5
            }
          }
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (tooltipItem) => '$' + tooltipItem.raw
            }
          }
        }
      }
    };

    new Chart(ctx, config);
  }
}
