import {Component, Input} from '@angular/core';

import {backgroundColor, textColor} from '../data/config';

@Component({
  selector: 'app-statistic-card-percent',
  imports: [],
  template: `

<div class="  card card-sm my-2 " [style.background-color]="backgroundColor">
  <div class="pt-2 pb-1 px-3">
    <div class="row">
      <div class="col">
        <div class="d-flex">
          <div class="flex-shrink-0">
            <i [class]="icon + ' nav-icon'"></i>
          </div>
          <div class="flex-grow-1 ms-3">
            <h4 class="mb-1" [style.color]="textColor" >{{title }}</h4>

            <!-- Conditional badge or simple value -->
            @switch (title) {
              @case ('Progress') {
                <span class="fs-5 text-success" [style.color]="textColor">
                  <i class="tio-trending-up" ></i> {{ value }}
                </span>
                }@case ('Tasks closed') {
                <span class="d-block">{{ value }}
                </span>
                }@default {
                <span class="d-block" [style.color]="textColor">{{value }}</span>
              }
            }
          </div>
        </div>
      </div>

      <div class="col-auto mb-1">
        <div class="circles-chart">
          <div class="js-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
              <circle cx="25" cy="25" r="23.5" attr.stroke="#e7eaf3" stroke-width="3" fill="transparent"/>
              <path fill="transparent" [attr.stroke]="percentColor" stroke-width="3" [attr.d]="getCirclePath(percent)" stroke-linecap="round"></path>
            </svg>
            <div class="circles-chart-content" style="position: absolute; text-align: center; width: 100%; font-size: 14px; height: auto; line-height: normal; color: #377dff;">{{ percent }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



`

})
export class StatisticCardPercent {
  @Input() icon= 'bi-receipt'
  @Input() title= 'Mining'
  @Input() value= '-$71,431.00'
  @Input() percent= 54
  @Input() percentColor= '#377dff'

  getCirclePath(percent: number): string {
    const radius = 23.5;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percent / 100);
    const angle = 2 * Math.PI * (percent / 100);
    const x = 25 + radius * Math.sin(angle);
    const y = 25 - radius * Math.cos(angle);

    return `M 25 1.5 A ${radius} ${radius} 0 ${percent > 50 ? 1 : 0} 1 ${x} ${y}`;
  }


  protected readonly backgroundColor = backgroundColor;
  protected readonly textColor = textColor;
}
