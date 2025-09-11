import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-start',
  imports: [
    DecimalPipe
  ],
  templateUrl: './start.html',
  styleUrl: './start.scss'
})
export class Start {
  progress = 0;
  intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const totalDuration = 10_000; // 30 seconds
    const tick = 100; // update every 300ms
    const increment = 100 / (totalDuration / tick);

    this.intervalId = setInterval(() => {
      this.progress += increment;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(this.intervalId);
        this.router.navigate(['/start']); // Redirect after 30s
      }
    }, tick);
  }
}
