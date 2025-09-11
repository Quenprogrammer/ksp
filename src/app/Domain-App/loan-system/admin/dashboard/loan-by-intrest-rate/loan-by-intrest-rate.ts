import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-loan-by-interest-rate',
  standalone: true,
  template: `
    <div class="card mb-3 mb-lg-5">
      <!-- Header -->
      <div class="card-header card-header-content-sm-between">
        <h4 class="card-header-title mb-2 mb-sm-0">
          Loan by interest rate
          <i class="bi-question-circle text-body ms-1"
             data-bs-toggle="tooltip"
             data-bs-placement="top"
             aria-label="Net sales (gross sales minus discounts and returns) plus taxes and shipping. Includes orders from all sales channels."></i>
        </h4>

        <div class="d-grid d-sm-flex gap-2">
          <!-- Select -->
          <select class="form-select form-select-sm">
            <option value="in-store">In-store</option>
            <option value="online-store" selected>Online store</option>
          </select>
          <!-- End Select -->

          <!-- Daterangepicker -->
          <button class="btn btn-white btn-sm dropdown-toggle">
            <i class="bi-calendar-week"></i>
            <span class="ms-1">Sep 1 - Sep 1, 2025</span>
          </button>
          <!-- End Daterangepicker -->
        </div>
      </div>
      <!-- End Header -->

      <!-- Body -->
      <div class="card-body">
        <div class="row col-lg-divider">
          <div class="col-lg-9 mb-5 mb-lg-0">
            <!-- Bar Chart -->
            <div class="chartjs-custom mb-4" style="height: 240px;">
              <canvas #barChart></canvas>
            </div>
            <!-- End Bar Chart -->

            <div class="row justify-content-center">
              <div class="col-auto">
                <span class="legend-indicator bg-primary"></span> Revenue
              </div>
              <div class="col-auto">
                <span class="legend-indicator"></span> Orders
              </div>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="row">
              <div class="col-sm-6 col-lg-12">
                <div class="d-flex justify-content-center flex-column" style="min-height: 9rem;">
                  <h6 class="card-subtitle">Revenue</h6>
                  <span class="d-block display-4 text-dark mb-1 me-3">$97,458.20</span>
                  <span class="d-block text-success">
                    <i class="bi-graph-up me-1"></i> $2,401.02 (3.7%)
                  </span>
                </div>
                <hr class="d-none d-lg-block my-0">
              </div>

              <div class="col-sm-6 col-lg-12">
                <div class="d-flex justify-content-center flex-column" style="min-height: 9rem;">
                  <h6 class="card-subtitle">Orders</h6>
                  <span class="d-block display-4 text-dark mb-1 me-3">67,893</span>
                  <span class="d-block text-danger">
                    <i class="bi-graph-down me-1"></i> +3,301 (1.2%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Body -->
    </div>
  `
})
export class LoanByInterestRateComponent implements AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const ctx = this.barChart.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM'],
        datasets: [
          {
            data: [200, 300, 290, 350, 150, 350, 300, 100, 125, 220, 225],
            backgroundColor: '#377dff',
            borderColor: '#377dff',
            hoverBackgroundColor: '#377dff',
            maxBarThickness: 10,
            categoryPercentage: 0.5   // ✅ moved here
          },
          {
            data: [150, 230, 382, 204, 169, 290, 300, 100, 300, 225, 140],
            backgroundColor: '#e7eaf3',
            borderColor: '#e7eaf3',
            maxBarThickness: 10,
            categoryPercentage: 0.5   // ✅ moved here
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,   // ✅ moved here
            grid: {
              color: '#e7eaf3'
            },
            ticks: {
              stepSize: 100,
              color: '#97a4af',
              font: {
                size: 12,
                family: 'Open Sans, sans-serif'
              },
              padding: 10
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              color: '#97a4af',
              font: {
                size: 12,
                family: 'Open Sans, sans-serif'
              },
              padding: 5
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        }
      }
    };

    new Chart(ctx, config);
  }
}
