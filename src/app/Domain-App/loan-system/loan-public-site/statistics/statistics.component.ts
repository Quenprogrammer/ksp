import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
export interface Statistic {
  value: number;
  icon:  number | string;
  label: string;
  animatedValue?: number; // Optional property for animated value
}
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  @ViewChild('statisticsSection') statisticsSection!: ElementRef;

  statistics: Statistic[] = [
    { value: 6, label: 'Programs', icon:' loanSystemIcons/stats/aid-construction-first-svgrepo-com.svg' },
    { value: 20, label: 'Projects', icon:' loanSystemIcons/stats/child-program-svgrepo-com.svg' },
    { value: +20, label: 'Community served',icon: ' loanSystemIcons/stats/community-svgrepo-com.svg' ,},
    { value: 800, label: 'Volunteers Engaged',icon:' loanSystemIcons/stats/people-distance-svgrepo-com.svg' },



  ];

  private isAnimated: boolean = false; // Flag to check if animation has started

  ngAfterViewInit(): void {
    this.createObserver();
  }

  private createObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isAnimated) {
          this.animateStatistics(); // Start the animation
          this.isAnimated = true; // Set the flag to true to avoid re-triggering
          observer.unobserve(entry.target); // Stop observing once the animation starts
        }
      });
    });

    observer.observe(this.statisticsSection.nativeElement); // Observe the section
  }

  private animateStatistics(): void {
    const duration = 8000; // Increased duration to 6000 ms (6 seconds)
    this.statistics.forEach(stat => {
      stat.animatedValue = 0; // Initialize animatedValue to 0
      const total = stat.value;
      const increment = Math.ceil(total / (duration / 100)); // Increment value
      let current = 0;

      const interval = setInterval(() => {
        if (current < total) {
          current += increment; // Increase current value
          if (current > total) {
            current = total; // Ensure it does not exceed the total
          }
          stat.animatedValue = current; // Update animatedValue
        } else {
          clearInterval(interval); // Clear interval when done
        }
      }, 100); // Update every 100 milliseconds
    });
  }
}
