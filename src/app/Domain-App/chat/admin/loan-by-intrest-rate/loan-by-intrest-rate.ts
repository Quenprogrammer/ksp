import {Component, AfterViewInit, ElementRef, ViewChild, Input} from '@angular/core';
import { Firestore, collection, getCountFromServer } from '@angular/fire/firestore';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-chartData-stats',
  standalone: true,
  template: `
    <div class="card mb-3 mb-lg-5">
      <div class="card-header card-header-content-sm-between">
        <h4 class="card-header-title mb-2 mb-sm-0">Document Count by Collection</h4>
      </div>

      <div class="card-body">
        <div class="chartjs-custom mb-4" style="height: 240px;">
          <canvas #barChart></canvas>
        </div>
      </div>
    </div>
  `
})
export class LoanByInterestRateComponent implements AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;

  // Accept collection names as input, with defaults
  @Input() collections: string[] = [
    'KSP_ADMINISTRATORS',
    'MISCONDUCT',
    'RECTOR',
    'KSP_SECURITY',
    'STUDENT_AFFAIRS'
  ];

  constructor(private firestore: Firestore) {}

  async ngAfterViewInit() {
    const ctx = this.barChart.nativeElement.getContext('2d');
    if (!ctx || this.collections.length === 0) return;

    // Fetch total document counts from Firestore
    const counts = await Promise.all(
      this.collections.map(async name => {
        const snapshot = await getCountFromServer(collection(this.firestore, name));
        return snapshot.data().count || 0;
      })
    );

    // Generate dynamic colors based on the number of collections
    const colors = this.collections.map((_, i) =>
      `hsl(${(i * 60) % 360}, 70%, 50%)`
    );

    // Configure chart
    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: this.collections,
        datasets: [
          {
            label: 'Total Documents',
            data: counts,
            backgroundColor: colors,
            borderColor: '#fff',
            borderWidth: 1,
            maxBarThickness: 30
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context) => `Count: ${context.formattedValue}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: '#97a4af',
              font: { size: 12, family: 'Open Sans, sans-serif' }
            },
            grid: { color: '#e7eaf3' }
          },
          x: {
            ticks: {
              color: '#97a4af',
              font: { size: 12, family: 'Open Sans, sans-serif' }
            },
            grid: { display: false }
          }
        }
      }
    };

    new Chart(ctx, config);
  }
}
