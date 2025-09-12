import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-loniars',
  imports: [
    NgForOf
  ],
  templateUrl: './loniars.html',
  styleUrl: './loniars.css'
})
export class Loniars {
  dashboardCards = [
    {
      title: 'Inbox',
      description: 'View and manage your messages',
      icon: './assets/svg/illustrations/oc-megaphone.svg',
      link: '#'
    },
    {
      title: 'Notifications',
      description: 'Check recent alerts and updates',
      icon: './assets/svg/illustrations/oc-megaphone.svg',
      link: '#'
    },
    {
      title: 'Add Banks',
      description: 'Connect and manage your bank accounts',
      icon: './assets/svg/illustrations/oc-megaphone.svg',
      link: '#'
    },
    {
      title: 'Database',
      description: 'Access and manage stored data',
      icon: './assets/svg/illustrations/oc-megaphone.svg',
      link: '#'
    },
    {
      title: 'Records',
      description: 'Track and review transaction history',
      icon: './assets/svg/illustrations/oc-megaphone.svg',
      link: '#'
    },
    {
      title: 'Settings',
      description: 'Configure system preferences',
      icon: './assets/svg/illustrations/oc-megaphone.svg',
      link: '#'
    }
  ];
}
