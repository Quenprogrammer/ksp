import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

import {StartUpComponent} from './system/start-up/start-up.component';
import {SettingsMenuComponent} from './system/start-up/settings-menu/settings-menu.component';
import {PasswordModalComponent} from './guard/password-modal/password-modal.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [
    RouterLink,

    StartUpComponent,
    SettingsMenuComponent,
    PasswordModalComponent,
    NgIf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  onUnlock(success: boolean): void {
    this.accessGranted = success;
  }
  accessGranted = false;
}
