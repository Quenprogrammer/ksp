import { Component, OnInit } from '@angular/core';
import { StudentContextService } from '../../../../services/student-context';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./comment.css']
})
export class Comment implements OnInit {
  student: any;

  constructor(private studentContext: StudentContextService) {}

  ngOnInit() {
    this.student = this.studentContext.student;
  }
}
