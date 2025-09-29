import {Component, signal} from '@angular/core';
import {Network} from '../component/network/network';
import {NetworkStatsComponent} from '../../core/network-stats.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-menu-card-header',
  imports: [
    Network,
    NetworkStatsComponent,
    NgIf
  ],
  templateUrl: './menu-card-header.html',
  styleUrl: './menu-card-header.css'
})
export class MenuCardHeader {
  nav = signal(false);
  navOpenButton = signal(false);
  navCloseButton = signal(false);
  openNav(){
    this.nav.set(true)

    this.navCloseButton.set(true)
    this.navOpenButton.set(false)
  }
  closeNav(){
    this.nav.set(false)

    this.navOpenButton.set(true)
    this.navCloseButton.set(false)
  }
}
