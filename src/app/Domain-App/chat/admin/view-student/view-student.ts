import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
interface Student {
  name: string;
  email: string;
  phone: string;
  department: string;
  course: string;
  level: string;
  image: string; // store image path or base64 string
}

@Component({
  selector: 'app-view-student',
  imports: [
    NgForOf
  ],
  templateUrl: './view-student.html',
  styleUrl: './view-student.scss'
})
export class ViewStudent {
  students: Student[] = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '08012345678',
      department: 'Computer Science',
      course: 'Web Development',
      level: 'ND',
      image: 'assets/img/students/john.jpg'
    },
    {
      name: 'Aisha Bello',
      email: 'aisha@example.com',
      phone: '08098765432',
      department: 'Business Administration',
      course: 'Marketing',
      level: 'HND',
      image: 'assets/img/students/aisha.jpg'
    }
  ];
}
