// src/app/services/student-context.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentContextService {
  student = signal<any | null>(null);

  constructor() {
    // Load from localStorage if available
    const stored = localStorage.getItem('student');
    if (stored) {
      this.student.set(JSON.parse(stored));
    }
  }

  setStudent(data: any) {
    this.student.set(data);
    localStorage.setItem('student', JSON.stringify(data));
  }

  clearStudent() {
    this.student.set(null);
    localStorage.removeItem('student');
  }

  getStudent() {
    return this.student();
  }
}
