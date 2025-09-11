import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-my-department',
  imports: [
    RouterLink
  ],
  templateUrl: './my-department.html',
  styleUrl: './my-department.scss'
})
export class MyDepartment {
  totalStudents=120
  departmentName='Computer Science'
studentsStats=[
  {level:'ND1', percent:(40/this.totalStudents)*100 ,students:40},
  {level:'ND2', percent:(30/this.totalStudents)*100 ,students:30},
  {level:'HND1', percent:(29/this.totalStudents)*100 ,students:29},
  {level:'HND2', percent:(18/this.totalStudents)*100,students:18},
]
}
