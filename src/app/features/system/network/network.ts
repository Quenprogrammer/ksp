import {Component, signal, WritableSignal} from '@angular/core';

import {NgIf} from '@angular/common';
import {NetworkService} from '../network.service';
import {NetworkSpeedService} from '../network-speed.service';

@Component({
  selector: 'app-network',
  imports: [
    NgIf
  ],
  templateUrl: './network.html',
  styleUrl: './network.scss'
})
export class Network {

  isOnline:WritableSignal<boolean>= signal(true);
  private timer!:WritableSignal<any>;
  constructor(private networkService: NetworkService,private networkSpeed: NetworkSpeedService) {
  }

    ngOnInit(): void {
    this.networkService.getOnlineStatus().subscribe(status => {
      this.isOnline.set(status)  ;
    });
      this.networkInfo = this.networkSpeed.getNetworkInfo();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer()); // Clear the timer on component destroy
    }
  }
  networkInfo: any;



}
