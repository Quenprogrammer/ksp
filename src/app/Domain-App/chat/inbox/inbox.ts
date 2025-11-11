import {Component} from '@angular/core';
import {HeaderPoly} from "../request/header-poly/header-poly";
import {RouterLink} from "@angular/router";
import {StudentContextService} from '../../../services/student-context';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-inbox',
  imports: [
    HeaderPoly,
    RouterLink,
    NgIf
  ],
  templateUrl: './inbox.html',
  styleUrl: './inbox.scss'
})
export class Inbox {
  totalStudents=120
  departmentName='Computer Science'
  student: any;

  constructor(private studentContext: StudentContextService) {}

  ngOnInit() {
    this.student = this.studentContext.student;
  }
}
