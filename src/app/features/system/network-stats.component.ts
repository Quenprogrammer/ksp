import {Component, OnInit} from '@angular/core';

import {NgIf} from '@angular/common';
import {NetworkSpeedService} from './network-speed.service';


@Component({
    selector: 'app-network-stats',
    standalone: true,
  imports: [
    NgIf
  ],
  template: `
    <div class="d-lg-flex align-items-md-center" *ngIf="networkInfo; else noSupport">

      <div class="flex-grow-1 ms-lg-3 mt-n2">
        <p class="mb-0 mt-3" style="font-size: 12px" >  Down-Link    {{ networkInfo.downlink }}Mbps </p>

        <h6 class="mb-0" >{{ networkInfo.effectiveType }} ..RTT {{ networkInfo.rtt }}ms </h6>



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
