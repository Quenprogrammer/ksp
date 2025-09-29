
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-complain-statistics',
  imports: [],
  templateUrl: './complain-statistics.html',
  styleUrl: './complain-statistics.css'
})
export class ComplainStatistics {
  @ViewChild('genderPieChart') genderPieChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: [60, 40], // 👈 Example values: 60% Male, 40% Female
            backgroundColor: ['#007bff', '#e83e8c'], // Blue & Pink
            borderColor: '#fff',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            enabled: true
          }
        }
      }
    };

    this.chart = new Chart(this.genderPieChart.nativeElement, config);
  }
}
