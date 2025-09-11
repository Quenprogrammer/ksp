import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
interface Lecturer {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  qualification: string;
  specialization: string;
  photo: string;
}
@Component({
  selector: 'app-lecturers',
  imports: [
    NgForOf
  ],
  templateUrl: './lecturers.html',
  styleUrl: './lecturers.scss'
})
export class Lecturers {
  // Sample data (2 lecturers only)
  lecturers: Lecturer[] = [
    {
      fullName: 'Dr. Musa Ibrahim',
      email: 'musa.ibrahim@example.com',
      phone: '08012345678',
      department: 'Computer Science',
      qualification: 'PhD',
      specialization: 'Artificial Intelligence',
      photo: 'assets/img/lecturers/musa.jpg'
    },
    {
      fullName: 'Mrs. Aisha Bello',
      email: 'aisha.bello@example.com',
      phone: '08098765432',
      department: 'Business Administration',
      qualification: 'MSc',
      specialization: 'Marketing',
      photo: 'assets/img/lecturers/aisha.jpg'
    }
  ];
}
