import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'lh-notifications',
  imports: [NgForOf],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  notificationOptions = [
    {
      id: 'product-sold',
      title: 'Product sold notifications',
      desc: 'Send an email when someone purchased one of my product.',
      checked: true,
    },
    {
      id: 'product-update',
      title: 'Product update notifications',
      desc: "Send an email when a product I've purchased is updated.",
      checked: true,
    },
    {
      id: 'surveys',
      title: 'Surveys and tests',
      desc: 'Receive invitations to participate in surveys, consultations, and tool testing.',
      checked: false,
    },
    {
      id: 'product-review',
      title: 'Product review notifications',
      desc: 'Company news and cooperation offers.',
      checked: true,
    },
    {
      id: 'daily-summary',
      title: 'Daily summary emails',
      desc: 'Send an email when someone leaves a review with his/her rating.',
      checked: false,
    },
  ];

  onToggle(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    console.log(id, input.checked); // logs "product-sold true/false"
  }
}
