import {Component, Input, OnInit, signal} from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  Timestamp
} from '@angular/fire/firestore';
import { NgForOf, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HeaderPoly} from '../Domain-App/chat/request/header-poly/header-poly';

@Component({
  selector: 'app-student-affairs-inbox',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgForOf,
    NgIf,
    HeaderPoly
  ],
  templateUrl: './student-affairs-inbox.html',
  styleUrl: './student-affairs-inbox.css'
})
export class StudentAffairsInbox implements OnInit {
  @Input() collection: string = 'STUDENT_AFFAIRS';
  messages = signal<any[]>([]);
  loading = signal(true);

  selectedMessage: any = null;
  replyContent = '';

  isModalOpen = false; // ✅ Angular-controlled modal

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const colRef = collection(this.firestore, this.collection);

    collectionData(colRef, { idField: 'id' }).subscribe({
      next: (data) => {
        this.messages.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Failed to load messages', err);
        this.loading.set(false);
      }
    });
  }

  /** 🔓 Open Reply Modal */
  openReplyModal(msg: any): void {
    this.selectedMessage = msg;
    this.replyContent = '';
    this.isModalOpen = true;
  }

  /** ❌ Close Modal */
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedMessage = null;
    this.replyContent = '';
  }

  /** 📩 Send Reply to STUDENT INBOX */
  async sendReply(): Promise<void> {
    if (!this.replyContent.trim() || !this.selectedMessage) return;

    const location: string = this.selectedMessage.student?.location;

    if (!location || !location.includes('/')) {
      console.error('❌ Invalid student location:', location);
      return;
    }

    // 🔹 Parse "STUDENTS_COLLECTION/email"
    const [studentCollection, studentDocId] = location.split('/');

    // 🔹 Path: STUDENTS_COLLECTION/{docId}/INBOX
    const inboxRef = collection(
      this.firestore,
      studentCollection,
      studentDocId,
      'inbox'
    );

    await addDoc(inboxRef, {
      content: this.replyContent,
      createdAt: Timestamp.now(),
      sender: 'System',
      status: 'SENT',

      // references
      originalMessageId: this.selectedMessage.id,
      recipientIds: this.selectedMessage.recipientIds || [],

      // metadata
      student: this.selectedMessage.student || {},
      device: this.selectedMessage.device || {}
    });

    console.log('✅ Reply sent to student INBOX');

    this.closeModal();
  }
}
