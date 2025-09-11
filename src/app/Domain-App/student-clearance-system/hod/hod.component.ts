import {Component, signal} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {StudentsListComponent} from './students-list/students-list.component';

import {ViewMessagesComponent} from './view-messages/view-messages.component';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-hod',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf,
    NgForOf,
    StudentsListComponent,
    HeaderComponent,
    ViewMessagesComponent,
    HeaderComponent
  ],
  templateUrl: './hod.component.html',
  styleUrl: './hod.component.css'
})
export class HODComponent {
  dashboardStats = [
    {
      icon: 'bi-receipt',
      title: 'Verified students',
      value: '-$71,431.00 USD',
      percent: 54,
      percentColor: '#377dff'
    },
    {
      icon: 'bi-bar-chart',
      title: 'Pending students',
      value: '1.7%',
      percent: 80,
      percentColor: '#377dff',
      isPositive: true
    },
    {
      icon: 'bi-check2-circle',
      title: 'Unverified students',
      value: '79',
      badge: '+4 today',
      percent: 67,
      percentColor: '#377dff'
    },

  ];
  getCirclePath(percent: number): string {
    const radius = 23.5;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percent / 100);
    const angle = 2 * Math.PI * (percent / 100);
    const x = 25 + radius * Math.sin(angle);
    const y = 25 - radius * Math.cos(angle);

    return `M 25 1.5 A ${radius} ${radius} 0 ${percent > 50 ? 1 : 0} 1 ${x} ${y}`;
  }
  VerifiedStudentModalOpen = signal(false);
  unVerifiedStudentModalOpen = signal(false);
}
