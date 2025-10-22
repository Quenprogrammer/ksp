import { Component } from '@angular/core';
import {HeaderPoly} from "../../request/header-poly/header-poly";
import {NgIf} from '@angular/common';
import {
  PasswordModalComponent
} from '../../../loan-system/admin/settings/guard/password-modal/password-modal.component';
import {UploadResumeComponent} from './upload-resume/upload-resume.component';

@Component({
  selector: 'app-rector',
  imports: [
    HeaderPoly,
    NgIf,
    PasswordModalComponent,
    UploadResumeComponent,

  ],
  templateUrl: './rector.html',
  styleUrl: './rector.css'
})
export class KspRectorComponent {
  accessGranted = false;
  onUnlock(success: boolean): void {
    this.accessGranted = success;
  }

}
