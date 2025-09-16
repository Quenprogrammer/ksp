import {AfterViewInit, Component, ElementRef, Input, signal, ViewChild, WritableSignal} from '@angular/core';
import { NgForOf } from '@angular/common';

export interface Statistic {
  value: number;
  icon: string;
  label: string;
  unit: string;
  classStyle: string;
  animatedValue?: number;
  duration?: number; // Unique duration for each stat
  interval?: number; // Unique interval for each stat
}

@Component({
  selector: 'app-stats-loading',
  standalone: true,
  imports: [NgForOf,],
  template: ``,
  styleUrls: ['./stats-loading.component.css']
})
export class StatsLoadingComponent {

  statisticsData: Statistic[] = [
    { value: 20000 , unit: 'ML', label: 'Records', icon: 'assets/icons/programs.svg', classStyle: 'bi-person fs-1 text-primary', duration: 10000, interval: 100 },
    { value: 200000, unit: ' MB', label: 'Storage', icon: 'assets/icons/lab.svg', classStyle: 'bi-clock-history fs-1 text-primary', duration: 10000, interval: 20 },
    { value: 650, unit: ' ms', label: 'Speed', icon: 'assets/icons/nursery.svg', classStyle: 'bi-files-alt fs-1 text-primary', duration: 3000, interval: 15 },
    { value: 800, unit: 'ms', label: 'CRUD Operations', icon: 'assets/icons/student.svg', classStyle: 'bi-pie-chart fs-1 text-primary', duration: 3500, interval: 12 }
  ];


}
