import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, CollectionReference, doc } from '@angular/fire/firestore';
import { HeaderPoly } from "../request/header-poly/header-poly";
import { RouterLink } from "@angular/router";
import { StudentContextService } from '../../../services/student-context';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

interface Message {
  id: string;
  email: string;
  message: string;
  name: string;
  registrationNumber: string;
  sentAt: any; // Firestore timestamp
  studentId: string;
}

@Component({
  selector: 'app-inbox',
  imports: [
    HeaderPoly,
    RouterLink,
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl:'./inbox.html',
  styleUrls: ['./inbox.scss']
})
export class Inbox implements OnInit {
  departmentName = 'Computer Science';
  student: any;
  studentLocation: string = '';
  messages: Message[] = [];

  constructor(private studentContext: StudentContextService, private firestore: Firestore) {}

  async ngOnInit() {
    // Get the current student from the signal
    this.student = this.studentContext.getStudent();

    if (this.student) {
      this.studentLocation = this.student.location || '';

      // Build path to the nested inbox collection for this student
      const inboxColRef = collection(
        this.firestore,
        `STUDENTS_COLLECTION/${this.student.email}/inbox`
      ) as CollectionReference<Message>;

      // Fetch all documents
      const snapshot = await getDocs(inboxColRef);

      // Map to array and sanitize data
      this.messages = snapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email || '',
            message: data.message || '',
            name: data.name || '',
            registrationNumber: data.registrationNumber || '',
            sentAt: data.sentAt || null,
            studentId: data.studentId || ''
          } as Message;
        })
        .sort((a, b) => b.sentAt?.seconds - a.sentAt?.seconds); // Optional: sort by most recent
    }

    console.log('Student location:', this.studentLocation);
    console.log('Messages:', this.messages);
  }

  deleteMessage(index: number) {
    const msg = this.messages[index];
    if (confirm(`Are you sure you want to delete the message from ${msg.name}?`)) {
      this.messages.splice(index, 1);

      // Optional: delete from Firestore
      // const docRef = doc(this.firestore, `STUDENTS_COLLECTION/${this.student.email}/inbox/${msg.id}`);
      // deleteDoc(docRef);
    }
  }

}
