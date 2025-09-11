import {Component, signal, WritableSignal} from '@angular/core';
import {NetworkService} from '../../../../services/network.service';
import {NgIf} from '@angular/common';

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
  constructor(private networkService: NetworkService) {
  }

    ngOnInit(): void {
    this.networkService.getOnlineStatus().subscribe(status => {
      this.isOnline.set(status)  ;
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer()); // Clear the timer on component destroy
    }
  }

}
