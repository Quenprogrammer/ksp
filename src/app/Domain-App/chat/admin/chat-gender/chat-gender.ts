import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import Chart, {ChartConfiguration} from 'chart.js/auto';

@Component({
  selector: 'app-chat-gender',
  imports: [],
  templateUrl: './chat-gender.html',
  styleUrl: './chat-gender.css'
})
export class ChatGender implements AfterViewInit{
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
