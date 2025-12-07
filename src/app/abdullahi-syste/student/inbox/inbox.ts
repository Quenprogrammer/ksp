import { Component } from '@angular/core';
import {HeaderPoly} from '../../../Domain-App/chat/request/header-poly/header-poly';
import {Modal} from '../../../shared/modal';
import {NgForOf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentContextService} from '../../../services/student-context';
import {addDoc, collection, CollectionReference, Firestore, getDocs} from '@angular/fire/firestore';
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
    Modal,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './inbox.html',
  styleUrl: './inbox.css'
})
export class FCAPInbox {
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
  openModal = false;
  selectedMessage: Message | null = null;
  replyText: string = '';

  openReply(msg: Message) {
    this.selectedMessage = msg;
    this.replyText = '';
    this.openModal = true;
  }

  closeModal() {
    this.openModal = false;
  }
  async sendReply() {
    if (!this.replyText.trim()) {
      alert("Please type a reply");
      return;
    }

    if (!this.selectedMessage) return;

    const reply = {
      replyText: this.replyText,
      sentAt: new Date(),
      studentId: this.selectedMessage.studentId,
      fromAdmin: true,
      replyToName: this.selectedMessage.name,
      replyToEmail: this.selectedMessage.email,
      originalMessageId: this.selectedMessage.id
    };

    const inboxRef = collection(
      this.firestore,
      `STUDENTS_COLLECTION/${this.selectedMessage.studentId}/inbox`
    );

    await addDoc(inboxRef, reply);

    alert("Reply sent!");

    this.replyText = '';
    this.openModal = false;
  }
}
