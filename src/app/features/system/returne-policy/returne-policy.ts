import { Component } from '@angular/core';
import {AnoumouseFooter} from '../../core/anoumouse-footer/anoumouse-footer';
interface PolicySection {
  title: string;
  content: string;
  icon: string;
}

interface FAQ {
  question: string;
  answer: string;
  expanded: boolean;
}

@Component({
  selector: 'app-returne-policy',
  imports: [
    AnoumouseFooter
  ],
  templateUrl: './returne-policy.html',
  styleUrl: './returne-policy.css'
})
export class ReturnePolicy {
  policySections: PolicySection[] = [
    {
      title: 'Return Window',
      content: 'You have 30 days from the date of purchase to return your item(s). Items must be in original condition with all tags attached and original packaging.',
      icon: 'bi-calendar-check'
    },
    {
      title: 'Eligibility',
      content: 'To be eligible for a return, your item must be unused, in the same condition you received it, and in its original packaging. Certain items like perishable goods, personalized items, and gift cards are not eligible for return.',
      icon: 'bi-check-circle'
    },
    {
      title: 'Refund Process',
      content: 'Once we receive your return, we will inspect it and notify you of the approval or rejection. If approved, your refund will be processed within 10 business days to your original payment method.',
      icon: 'bi-currency-exchange'
    },
    {
      title: 'Return Shipping',
      content: 'Customers are responsible for return shipping costs unless the return is due to our error or a defective product. We recommend using a trackable shipping service and purchasing shipping insurance.',
      icon: 'bi-truck'
    },
    {
      title: 'Exchanges',
      content: 'We currently do not offer direct exchanges. To exchange an item, please return the original item for a refund and place a new order for the desired item.',
      icon: 'bi-arrow-left-right'
    },
    {
      title: 'Non-Returnable Items',
      content: 'Gift cards, downloadable software products, personalized/customized items, intimate apparel, and perishable goods cannot be returned. Please see complete list in our detailed policy.',
      icon: 'bi-x-circle'
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'How long does it take to receive my refund?',
      answer: 'Refunds typically take 7-10 business days to appear in your account after we process the return. The exact timing depends on your financial institution.',
      expanded: false
    },
    {
      question: 'Do I need a receipt to return an item?',
      answer: 'Yes, a receipt or proof of purchase is required for all returns. If you received the item as a gift, we can issue store credit for the current selling price.',
      expanded: false
    },
    {
      question: 'Can I return an item I bought on sale?',
      answer: 'Yes, sale items can be returned within the standard 30-day return window, provided they meet all other return conditions.',
      expanded: false
    },
    {
      question: 'What if my item arrives damaged?',
      answer: 'Please contact our customer service within 48 hours of delivery. We will arrange a free return and send a replacement at no additional cost.',
      expanded: false
    },
    {
      question: 'How do I start a return?',
      answer: 'Log into your account, go to "Order History", select the item you want to return, and follow the prompts. Alternatively, visit our Returns Center with your order number.',
      expanded: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleFAQ(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }

  printPolicy(): void {
    window.print();
  }
}
