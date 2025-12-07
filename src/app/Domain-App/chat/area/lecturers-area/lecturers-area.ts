import { Component } from '@angular/core';
import {
  PasswordModalComponent
} from '../../../loan-system/admin/settings/guard/password-modal/password-modal.component';
import {NgIf} from '@angular/common';
import {AreaMenu} from '../area-menu/area-menu';
import {KspStudentLogin} from '../../chatCore/ksp-student-login/ksp-student-login';

@Component({
  selector: 'app-lecturers-area',
  imports: [
    PasswordModalComponent,
    NgIf,
    AreaMenu,
    KspStudentLogin
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
