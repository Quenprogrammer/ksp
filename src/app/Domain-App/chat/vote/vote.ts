import {Component, HostListener, signal} from '@angular/core';
import Chart from 'chart.js/auto';
import {backgroundColor, textColor} from '../../../data/config';
import {Modal} from '../../../shared/modal';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-vote',
  imports: [
    Modal,
    NgIf
  ],
  templateUrl: './vote.html',
  styleUrl: './vote.scss'
})
export class Vote {
  isDropdownOpen = false;
  private chartInstance!: Chart;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.dropdown');
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

  ngAfterViewInit(): void {
    const ctx = document.getElementById('doughnutHalfChart') as HTMLCanvasElement;

    // Destroy old instance if it exists (prevents multiple renders on hot reload)
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Current status', 'Goal'],
        datasets: [
          {
            data: [64, 35],
            backgroundColor: ['red', 'black'],
            borderWidth: 4,
            borderColor: '#fff',
            hoverBorderColor: '#ffffff'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index', // Show all items at hover position
            intersect: false, // Don’t require direct intersection
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.formattedValue || '';
                return `${label}: ${value}`;
              }
            }
          }
        }
      }

    });

    // Set fixed size AFTER render to avoid initial shrink

  }
  chartWidth = 350; // change dynamically in TS
  width='600px'
  height='530px'
  deviceModal = signal(false);
  closeModal() {
    this.deviceModal.set(false);
  }
  backgroundColor='white'
  textColor='black'
  selectedRating: string | null = null;

  setRating(rating: string) {
    this.selectedRating = rating;
  }

  submitRating() {
    if (this.selectedRating) {
      console.log('User rating:', this.selectedRating);
    } else {
      console.log('No rating selected.');
    }
  }
}
