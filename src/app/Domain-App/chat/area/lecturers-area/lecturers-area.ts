import { Component } from '@angular/core';
import {
  PasswordModalComponent
} from '../../../loan-system/admin/settings/guard/password-modal/password-modal.component';
import {NgIf} from '@angular/common';
import {AreaMenu} from '../area-menu/area-menu';

@Component({
  selector: 'app-lecturers-area',
  imports: [
    PasswordModalComponent,
    NgIf,
    AreaMenu
  ],
  templateUrl: './lecturers-area.html',
  styleUrl: './lecturers-area.css'
})
export class LecturersArea {


  accessGranted = false;
  onUnlock(success: boolean): void {
    this.accessGranted = success;
  }

}
