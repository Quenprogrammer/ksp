import {Component, Input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {textColor} from '../data/config';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <div class="mb-0" style=" text-align: center;" [style.font-size]="fontSize" [style.color]="textColor">
      {{ counter() }}
    </div>
  `

})
export class Counter implements OnChanges{
  @Input() target = 100;
  @Input() fontSize = '0.9rem';
  @Input() step = 1; // amount to increase per tick
  @Input() speed = 50; // milliseconds per tick

  counter = signal(0);
  private intervalId: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['target'] || changes['step'] || changes['speed']) {
      this.startCounting();
    }
  }

  private startCounting() {
    clearInterval(this.intervalId);
    this.counter.set(0);

    this.intervalId = setInterval(() => {
      const current = this.counter();
      if (current < this.target) {
        const nextValue = Math.min(current + this.step, this.target);
        this.counter.set(nextValue);
      } else {
        clearInterval(this.intervalId);
      }
    }, this.speed);
  }

  protected readonly textColor = textColor;
}
