import { Component } from '@angular/core';
import {MyDepartment} from '../departments/my-department/my-department';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-public',
  imports: [
    MyDepartment,
    RouterLink
  ],
  templateUrl: './public.html',
  styleUrl: './public.scss'
})
export class Public {
  totalStudents=120
  departmentName='Computer Science'
  studentsStats=[
    {level:'Messages', percent:(40/this.totalStudents)*100 ,students:40},
    {level:'Links', percent:(30/this.totalStudents)*100 ,students:30},
    {level:'Files', percent:(29/this.totalStudents)*100 ,students:29},
    {level:'Images', percent:(18/this.totalStudents)*100,students:18},
  ]
}
