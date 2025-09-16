import {Component, signal} from '@angular/core';
import {StatisticCardPercent} from '../../../../../../../shared/statistic-card-percent';

@Component({
  selector: 'app-settings-stats',
  imports: [
    StatisticCardPercent

  ],
  templateUrl: './settings-stats.component.html',
  styleUrl: './settings-stats.component.css'
})
export class SettingsStatsComponent {
  messages= signal(120)
 users= signal<number>(46)
logs= signal<number>(0)
}
