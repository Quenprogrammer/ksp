import {Component, Input} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-generic-counter',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  template: `
    <h1 style="color: white"   [class]="class">{{ current }}</h1>
  `

})
export class GenericCounterComponent {

  @Input() public target: number = 0;
  @Input() public step: number = 1000;
  @Input() public speed: number = 30;
  @Input() public class: string = '';
  current = 0;
  private subscription?: Subscription;


  ngOnInit() {
    if (this.target > 0) {
      this.startCounter(this.target);
    }
  }

  startCounter(target: number) {
    if (this.subscription) this.subscription.unsubscribe();
    this.current = 0;

    const speed = this.speed;

//
    this.subscription = interval(speed)
      .pipe(takeWhile(() => this.current < target))
      .subscribe(() => {
        this.current += this.step;
        if (this.current > target) this.current = target;
      });
  }

}
