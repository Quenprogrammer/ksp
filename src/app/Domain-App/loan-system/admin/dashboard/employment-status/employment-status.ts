import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-employment-status',
  standalone: true,   // ✅ needed for standalone components
  template: `
    <div class="chartjs-doughnut-custom" style="height: 15rem; position: relative;">
      <canvas #doughnutCanvas></canvas>

      <!-- Center overlay -->
      <div class="chartjs-doughnut-custom-stat"
           style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
        <small class="text-cap">Project balance</small>
        <span class="h1 d-block">$150,238.00</span>
      </div>
    </div>
  `
})
export class EmploymentStatus implements AfterViewInit {
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const ctx = this.doughnutCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: ['Current status', 'Goal'],
        datasets: [{
          data: [64, 35],
          backgroundColor: ['#377dff', 'rgba(55,125,255,.35)'],
          borderWidth: 4,
          borderColor: '#fff',
          hoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        rotation: -90,
        circumference: 180,
        plugins: {
          legend: { display: false }
        }
      }
    };

    new Chart(ctx, config);
  }
}
