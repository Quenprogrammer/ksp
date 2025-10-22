import {Component} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
export interface SalesMetric {
  title: string;
  value: string;
  orders: string;
  percent?: string | null;
}
@Component({
  selector: 'app-loan-statistics',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './loan-statistics.html',
  styleUrl: './loan-statistics.css'
})
export class LoanStatistics {
  SALES_METRICS: SalesMetric[] = [
    {
      title: 'Paid',
      value: '$7,820.75',
      orders: '5k orders',
      percent: '4.3%'
    },
    {
      title: 'Outstanding',
      value: '$985,937.45',
      orders: '21k orders',
      percent: '12.5%'
    },
    {
      title: 'Total loan amount',
      value: '$15,503.00',
      orders: '6k orders',
      percent: null
    },
    {
      title: 'Stats',
      value: '-20%',
      orders: '150 orders',
      percent: '4.4%'
    }
  ];
}
