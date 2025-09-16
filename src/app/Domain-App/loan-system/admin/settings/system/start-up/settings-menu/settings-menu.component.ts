import {Component, signal} from '@angular/core';
import {NgIf} from '@angular/common';
import {ModalComponent} from './modal/modal.component';
import {RouterLink} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {LoginLogsComponent} from './login-logs/login-logs.component';

@Component({
  selector: 'app-settings-menu',
  imports: [
    NgIf,
    ModalComponent,
    RouterLink,
    UsersComponent,
    LoginLogsComponent
  ],
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.css'
})
export class SettingsMenuComponent {


  exportData = signal(false);
 logs = signal(false);
 users = signal(false);
data = signal(false);
}
