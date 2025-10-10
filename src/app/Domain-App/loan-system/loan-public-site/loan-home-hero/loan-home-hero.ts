import {Component} from '@angular/core';
import Typed from 'typed.js';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-loan-home-hero',
  imports: [
    RouterLink
  ],
  templateUrl: './loan-home-hero.html',
  styleUrl: './loan-home-hero.css'
})
export class LoanHomeHero {
  ngAfterViewInit(): void {
    const options = {
      strings: [
        "We believe in building truly inclusive communities for all.",
        "Our work is driven by sustainable, long-term community impact.",
        "We hold institutions and systems accountable to the people.",
        "We operate from a strong rights-based approach to justice.",
        "We are powered by grassroots voices and local leadership."
      ],
      typeSpeed: 120,
      backSpeed: 50,
      loop: true,
      showCursor: false  // <--- this hides the blinking cursor
    };

    new Typed('.js-typedjs', options);
  }
}
