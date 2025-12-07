import {Component, Input} from '@angular/core';
import {Start} from '../Domain-App/chat/start/start';
import {Router} from '@angular/router';

@Component({
  selector: 'app-abdullahi-syste',
  imports: [
    Start
  ],
  templateUrl: './abdullahi-syste.html',
  styleUrl: './abdullahi-syste.css'
})
export class AbdullahiSyste {
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
