import {Component} from '@angular/core';
import {HeaderPoly} from "../request/header-poly/header-poly";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-inbox',
    imports: [
        HeaderPoly,
        RouterLink
    ],
  templateUrl: './inbox.html',
  styleUrl: './inbox.scss'
})
export class Inbox {
  totalStudents=120
  departmentName='Computer Science'
  studentsStats=[
    {level:'ND1', percent:(40/this.totalStudents)*100 ,students:40},
    {level:'ND2', percent:(30/this.totalStudents)*100 ,students:30},
    {level:'HND1', percent:(29/this.totalStudents)*100 ,students:29},
    {level:'HND2', percent:(18/this.totalStudents)*100,students:18},
  ]
}
