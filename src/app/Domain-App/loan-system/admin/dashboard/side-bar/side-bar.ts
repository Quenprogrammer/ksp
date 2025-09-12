import {Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Modal} from '../../../../../shared/modal';
import {AddBank} from '../../add-bank/add-bank';
import {AddSim} from '../../add-sim/add-sim';
import {Logs} from '../../logs/logs';
import {Notifications} from '../notifications/notifications';

@Component({
  selector: 'app-side-bar',
  imports: [
    RouterLink,
    Modal,
    AddBank,
    AddSim,
    Logs,
    Notifications
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {
  openModal = signal(false);
  addBank = signal(false);
  addSim = signal(false);
 inbox = signal(false);
  logs = signal(false);
  notifications = signal(false);
  width='800px'
  height='600px'
  closeModal() {
    this. openModal.set(false);
  }
}
