import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {DecimalPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-start',
  templateUrl: './start.html',
  styleUrls: ['./start.scss'],
  standalone: true,
  imports: [DecimalPipe, NgIf, RouterLink]
})
export class Start implements OnInit {
  @Input() imageUrl: string = 'chatIcons/poly/poly.png';
  @Input() heading1: string = 'Kano State Polytechnic';
  @Input() heading2: string = 'Complain System';
  @Input() link: string = 'Complain System';

  progress = 0;
  intervalId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const totalDuration = 10_000; // 10 seconds
    const tick = 100; // update every 100ms
    const increment = 100 / (totalDuration / tick);

    this.intervalId = setInterval(() => {
      this.progress += increment;

      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(this.intervalId);
        // no automatic redirect now — user clicks button
      }
    }, tick);
  }

  goToNext() {
    this.router.navigate(['/start']); // Change to your desired route
  }
}
