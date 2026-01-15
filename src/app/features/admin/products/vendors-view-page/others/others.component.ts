import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
export interface AccordionData {
  id: string;
  title: string;
  summary: string;
  details: string;
}
@Component({
  selector: 'lh-others',
  imports: [NgForOf],
  templateUrl: './others.component.html',
  styleUrl: './others.component.scss',
})
export class OthersComponent {
  ACCORDION_ITEMS: AccordionData[] = [
    {
      id: 'warranty',
      title: 'Warranty information',
      summary:
        "12 months of official manufacturer's warranty. Exchange/return within 14 days.",
      details:
        'Explore the details of our product warranties including duration, coverage, and protection plans. We prioritize your satisfaction and our warranty information is designed to keep you confident in your purchase.',
    },
    {
      id: 'payment',
      title: 'Payment and credit',
      summary: 'Flexible payment options and credit facilities.',
      details:
        'Learn more about accepted payment methods, installment plans, and exclusive credit offers available to make your shopping experience seamless.',
    },
  ];
  items: AccordionData[] = this.ACCORDION_ITEMS;
  activePanel: string | null = null;

  togglePanel(id: string) {
    this.activePanel = this.activePanel === id ? null : id;
  }
}
