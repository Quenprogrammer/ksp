import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
 import { debounceTime } from 'rxjs/operators';
import {AffiliateProfileService} from './affiliate-profile.service';
import {DeleteAffiliateAccountComponent} from '../delete-affiliate-account/delete-affiliate-account.component';
import {AffiliatePasswordComponent} from '../affiliate-password/affiliate-password.component';
import {HeaderPoly} from '../../../../request/header-poly/header-poly';
import {StudentContextService} from '../../../../../../services/student-context';

@Component({
  selector: 'lh-affiliate-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, DeleteAffiliateAccountComponent, AffiliatePasswordComponent, HeaderPoly],
  templateUrl: './affiliate-profile.component.html',
  styleUrls: ['./affiliate-profile.component.scss'],
})
export class AffiliateProfileComponent implements OnInit {
  student: any;       // student object from context
  studentData: any;   // full document data from Firestore

  constructor(
    private studentContext: StudentContextService,
    private profileService: AffiliateProfileService
  ) {}

  ngOnInit(): void {
    // Get the student object from context
    this.student = this.studentContext.student;

    if (this.student?.location) {
      // Use the location as Firestore doc path
      this.loadStudentFromFirestore(this.student.location);
    }
  }

  async loadStudentFromFirestore(docPath: string) {
    try {
      this.studentData = await this.profileService.getProfile(docPath);
    } catch (err) {
      console.error('Error loading student document:', err);
    }
  }

  settings=[

    {name:"Delete all message", icon:"", link:""},
    {name:"Delete all Logs", icon:"", link:""},
    {name:"Backup Data", icon:"", link:""},
    {name:"Delete all notifications", icon:"", link:""},
    {name:"Security", icon:"", link:""},


  ]
}
