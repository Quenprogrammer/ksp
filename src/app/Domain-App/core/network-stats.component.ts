import {Component, OnInit} from '@angular/core';

import {NgIf} from '@angular/common';
import {NetworkSpeedService} from '../../services/downloadData/network-speed.service';

@Component({
    selector: 'app-network-stats',
    standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <div class="d-lg-flex align-items-md-center" *ngIf="networkInfo; else noSupport">
      <div class="flex-shrink-0">
      <img src="browser.svg" style="width: 40px">
      </div>

      <div class="flex-grow-1 ms-lg-3">
        <span class="d-block fs-6">  <span style="font-size: 20px;font-weight: bold">{{ networkInfo.effectiveType }}</span>    ..RTT {{ networkInfo.rtt }}ms </span>
        <div class="d--flex align-items-center">
          <p class="mb-0" >  Down-Link    {{ networkInfo.downlink }}Mbps </p>




        </div>
      </div>
    </div>



    <ng-template #noSupport>
      <p>Your browser does not support network speed detection.</p>
    </ng-template>


`,

  styles: `

`
})
export class NetworkStatsComponent implements OnInit {
  networkInfo: any;

  constructor(private networkService: NetworkSpeedService) {}

  ngOnInit() {
    this.networkInfo = this.networkService.getNetworkInfo();
  }
}
