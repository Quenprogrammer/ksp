import {Component, computed, Input, OnInit, signal, Signal} from '@angular/core';
import { DecimalPipe, NgForOf } from "@angular/common";

@Component({
  selector: 'tbr-price-calculator',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf
  ],
  templateUrl: './price-calculator.component.html',
  styleUrl: './price-calculator.component.scss'
})
export class PriceCalculatorComponent implements OnInit {
  pricePerNight = signal(788); // now it's a signal

  ngOnInit(): void {
    if (!this.pricePerNight()) {
      throw new Error('pricePerNight input is required.');
    }
  }

  days = signal(1); // Default number of days

  weeksList = Array.from({ length: 11 }, (_, i) => i + 1);
  yearsList = Array.from({ length: 5 }, (_, i) => i + 1);

  totalPrice = computed(() => this.days() * this.pricePerNight());
  totalWeeks = computed(() => Math.floor(this.days() / 7));
  totalMonths = computed(() => Math.floor(this.days() / 30));
  totalYears = computed(() => Math.floor(this.days() / 365));

  weeklyAmount = computed(() => this.totalWeeks() * 7 * this.pricePerNight());
  monthlyAmount = computed(() => this.totalMonths() * 30 * this.pricePerNight());
  yearlyAmount = computed(() => this.totalYears() * 365 * this.pricePerNight());

  setDaysFromWeeks(weeks: number): void {
    this.days.set(weeks * 7);
  }

  setDaysFromYears(years: number): void {
    this.days.set(years * 365);
  }
}

