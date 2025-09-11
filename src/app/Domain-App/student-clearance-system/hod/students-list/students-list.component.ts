import {Component, inject, signal} from '@angular/core';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-students-list',
  imports: [
    NgClass,
    DatePipe,
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent {
  private firestore = inject(Firestore);
  students$!: Observable<any[]>;

  ngOnInit(): void {
    const studentCollection = collection(this.firestore, 'STUDENTS');
    this.students$ = collectionData(studentCollection, { idField: 'id' });
  }
  viewStudent = signal(false);
  openModal() {
    console.log('OpenModal');
  }
}
