import {Component, inject, signal} from '@angular/core';
import { NetworkSpeedService } from '../../../services/downloadData/network-speed.service';
import { NgForOf, NgIf } from '@angular/common';
import {GetDeviceInfoService} from '../../../services/getDeviceInformation/get-device-info.service';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './device.html',
  styleUrls: ['./device.scss']
})
export class Device {
  networkInfo: any;
  dashboardStats: any[] = [];

  constructor(private networkService: NetworkSpeedService) {}

  ngOnInit() {
    this.networkInfo = this.networkService.getNetworkInfo();

    this.dashboardStats = [
      {
        icon: 'bi-receipt',
        title: 'Internet Speed',
        value: this.networkInfo.effectiveType,
        downloadSpeed: this.networkInfo.downlink + 'Mbps',  // ✅ integer Mbps
        RTT: Math.round(this.networkInfo.rtt) + ' ms',         // ✅ integer ms
        percent: Math.round((this.networkInfo.downlink / 4) * 100), // ✅ integer %
        percentColor: '#377dff'
      },


    ];
  }

  isOnline(): boolean {
    return navigator.onLine;
  }

  inbox = signal(1);

  getCirclePath(percent: number): string {
    const radius = 23.5;
    const circumference = 2 * Math.PI * radius;
    const angle = 2 * Math.PI * (percent / 100);
    const x = 25 + radius * Math.sin(angle);
    const y = 25 - radius * Math.cos(angle);

    return `M 25 1.5 A ${radius} ${radius} 0 ${percent > 50 ? 1 : 0} 1 ${x} ${y}`;
  }

  deviceService = inject(GetDeviceInfoService);
}
