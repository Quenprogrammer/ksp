import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-stats-card',
  imports: [],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss'
})
export class StatsCard {
  @Input() text: string = 'NULL';
  @Input() value: number = 0;
  @Input() icon: string = 'chatIcons/poly/poly.png';


}
