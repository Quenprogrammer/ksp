import { Component, HostListener } from '@angular/core';

import { NgForOf, NgIf } from '@angular/common';
import { VendorChartComponent } from '../vendor-chart/vendor-chart.component';
import { HomepageComponent } from '../dashboard/homepage/homepage.component';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';
import { RecentSalesComponent } from './recent-sales/recent-sales.component';

import {SelectComponent} from '../../shared/select/select.component';
import {DocCounterComponent} from '../../shared/collection-count/collection-count.component';
import {Header} from '../../shared/header/header';


@Component({
  selector: 'lh-dashboard',
  imports: [
    SelectComponent,
    NgForOf,
    NgIf,
    VendorChartComponent,

    DashboardStatsComponent,
    RecentSalesComponent,
    DocCounterComponent,
    Header,
    HomepageComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  selectedPeriod = 'Last 3 months';
  periodOptions: string[] = [
    'Current month',
    'Last month',
    'Last 3 months',
    'Last 6 months',
    'Last year',
  ];



}
