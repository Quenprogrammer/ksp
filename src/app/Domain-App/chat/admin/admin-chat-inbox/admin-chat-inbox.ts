import {Component, Input, OnInit} from '@angular/core';
import { Firestore, collection, getDocs, doc, deleteDoc, Timestamp } from '@angular/fire/firestore';
import {DatePipe, NgFor, NgForOf} from '@angular/common';

@Component({
  selector: 'app-admin-chat-inbox',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './admin-chat-inbox.html',
  styleUrl: './admin-chat-inbox.css'
})
export class AdminChatInbox {
  @Input() collection: string = 'ADMIN_TRACK_MESSAGE';
  messages: any[] = [];

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.loadMessages();
  }

  async loadMessages() {
    const colRef = collection(this.firestore, this.collection);
    const snapshot = await getDocs(colRef);

    this.messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async deleteMessage(docId: string) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const docRef = doc(this.firestore, 'ADMIN_TRACK_MESSAGE', docId);
      await deleteDoc(docRef);

      // Remove from local array for immediate UI update
      this.messages = this.messages.filter(m => m.id !== docId);
      console.log(`Message ${docId} deleted successfully`);
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  }
}
