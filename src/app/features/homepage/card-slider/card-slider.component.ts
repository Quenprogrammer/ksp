import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';
import {TrocateTextPipe} from "../../core/trocate-text.pipe";

@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [
    NgForOf,
    TrocateTextPipe
  ],
  templateUrl: './card-slider.component.html',
  styleUrl: './card-slider.component.css'
})
export class CardSliderComponent {
  @Input() news: any[] = [];

  currentIndex = 0;
  visibleCards = 3;
  slideInterval!: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.next();
    }, 1000); // slide every 4 seconds
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  next() {
    if (this.currentIndex < this.news.length - this.visibleCards) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // loop back
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }
}
