import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

interface Telco {
  name: string;
  users: number;
  icon: string;
  lastUpdated: string;
}
@Component({
  selector: 'app-complain-department-stats',
  imports: [
    NgForOf
  ],
  templateUrl: './complain-department-stats.html',
  styleUrl: './complain-department-stats.css'
})
export class ComplainDepartmentStats {
  sims: Telco[] = [
    { name: 'MTN', users: 80, icon: 'sim/mtn.png', lastUpdated: 'Updated 2 hours ago' },
    { name: 'Airtel', users: 60, icon: 'sim/airtel.png', lastUpdated: 'Updated 5 hours ago' },
    { name: 'Glo', users: 50, icon: 'sim/glo.jpg', lastUpdated: 'Updated 1 day ago' },
    { name: '9mobile', users: 20, icon: 'sim/9mobile.png', lastUpdated: 'Updated 2 days ago' }
  ];

  telcos: (Telco & { progress: number; hours: string })[] = [];

  constructor() {
    const maxUsers = Math.max(...this.sims.map(t => t.users)); // ✅ use sims, not telcos

    this.telcos = this.sims.map(t => {
      const progress = Math.round((t.users / maxUsers) * 100);
      const totalMinutes = t.users * 10; // 🔥 assume each "user million" = 10 mins
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return { ...t, progress, hours: `${hours}:${minutes.toString().padStart(2, '0')}` };
    });
  }
}
