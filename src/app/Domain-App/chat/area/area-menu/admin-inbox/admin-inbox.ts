import { Component } from '@angular/core';
import {collection, deleteDoc, doc} from 'firebase/firestore';
import {Firestore, getDocs} from '@angular/fire/firestore';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-admin-inbox',
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './admin-inbox.html',
  styleUrl: './admin-inbox.css'
})
export class AdminInbox {
  comments: any[] = [];
  loading: boolean = true; // Show loader while fetching data

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.loadComments();
  }

  // Load Firestore data
  async loadComments() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'STUDENT_AFFAIRS'));
      this.comments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      this.loading = false;
    }
  }

  // Delete comment
  async deleteComment(id: string) {
    if (confirm('Are you sure you want to delete this comment?')) {
      await deleteDoc(doc(this.firestore, 'comments', id));
      this.comments = this.comments.filter((item) => item.id !== id);
    }
  }
}
