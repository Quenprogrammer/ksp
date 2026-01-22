import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, orderBy, query, limit } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Chart, ChartConfiguration } from 'chart.js';
import { NgForOf } from '@angular/common';

interface ChartPoint {
  label: string;
  value: number;
}

@Component({
  selector: 'lh-vendor-chart',
  imports: [NgForOf],
  templateUrl: './vendor-chart.component.html',
  styleUrls: ['./vendor-chart.component.scss'], // ✅ fixed from styleUrl
})
export class VendorChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('earningsChart') earningsChart!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart<'line'>;
  private dataSub?: Subscription;

  chartPoints: ChartPoint[] = [];
  earnings$: Observable<ChartPoint[]>;

  constructor(private firestore: Firestore) {
    // Firestore query to get only the latest 10 entries, ordered by label
    const earningsCollection = collection(this.firestore, 'earningsHistory');
    const q = query(earningsCollection, orderBy('label', 'desc'), limit(10));
    this.earnings$ = collectionData(q, { idField: 'id' }) as Observable<ChartPoint[]>;
  }

  ngAfterViewInit(): void {
    this.dataSub = this.earnings$.subscribe((data) => {
      // Sort ascending so chart labels go from oldest → newest
      this.chartPoints = data.sort((a, b) => a.label.localeCompare(b.label));
      this.renderChart();
    });
  }

  private renderChart(): void {
    if (!this.earningsChart?.nativeElement) return;

    if (this.chart) this.chart.destroy();
    if (!this.chartPoints.length) return;

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: this.chartPoints.map((p) => p.label),
        datasets: [
          {
            label: 'Earnings (₦)',
            data: this.chartPoints.map((p) => p.value),
            fill: true,
            backgroundColor: 'rgba(51,179,107,.1)',
            borderColor: 'rgba(51,179,107,.6)',
            borderWidth: 2,
            pointBackgroundColor: '#33b36b',
            pointBorderWidth: 3,
            pointHoverBorderColor: '#33b36b',
            pointHoverBorderWidth: 6,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            border: { color: 'rgba(133,140,151,.18)' },
            grid: { color: 'rgba(133,140,151,.18)' },
          },
          x: {
            border: { color: 'rgba(133,140,151,.18)' },
            grid: { color: 'rgba(133,140,151,.18)' },
          },
        },
      },
    };

    this.chart = new Chart(this.earningsChart.nativeElement, config);
  }

  /**
   * Add sample chart data for testing
   */
  async addSampleData() {
    const earningsCollection = collection(this.firestore, 'earningsHistory');
    const sampleData: ChartPoint[] = [
      { label: '2025-10-01', value: 100 },
      { label: '2025-10-02', value: 250 },
      { label: '2025-10-03', value: 180 },
      { label: '2025-10-04', value: 300 },
      { label: '2025-10-05', value: 120 },
      { label: '2025-10-06', value: 400 },
      { label: '2025-10-07', value: 350 },
    ];

    try {
      for (const data of sampleData) {
        await addDoc(earningsCollection, data);
      }
      console.log('✅ Sample earnings data added successfully!');
      alert('Sample data added successfully!');
    } catch (error) {
      console.error('❌ Error adding sample data:', error);
      alert('Failed to add sample data!');
    }
  }

  ngOnDestroy(): void {
    if (this.dataSub) this.dataSub.unsubscribe();
    if (this.chart) this.chart.destroy();
  }
}
