import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'lh-header-sign-up',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './header-sign-up.component.html',
  animations: [
    trigger('fadeImage', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', [animate('1s ease-in-out')]),
    ]),
  ],
})
export class HeaderSignUpComponent implements OnInit, OnDestroy {
  @Output() hideRequested = new EventEmitter<void>();

  @Input() badgeText: string = '';
  @Input() title: string = '';
  @Input() heroDescription: string = '';
  @Input() buttonText: string = '';
  @Input() buttonNote: string = '';
  @Input() heroImages: string[] = [];

  currentIndex = 0;
  fadeState: 'visible' | 'hidden' = 'visible';
  intervalId: any;

  ngOnInit(): void {
    if (this.heroImages.length > 1) {
      this.intervalId = setInterval(() => this.nextImage(), 3000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  nextImage(): void {
    this.fadeState = 'hidden';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.heroImages.length;
      this.fadeState = 'visible';
    }, 2000); // halfway through fade
  }

  hideParentHeader(): void {
    this.hideRequested.emit();
  }
}
