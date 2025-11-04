import {Component} from '@angular/core';
import {StudentContextService} from '../../../services/student-context';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-view-profile',
  imports: [
    NgIf
  ],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css'
})
export class ViewProfile {
  student: any;

  constructor(private studentContext: StudentContextService) {}

  ngOnInit() {
    this.student = this.studentContext.student;
  }
}
