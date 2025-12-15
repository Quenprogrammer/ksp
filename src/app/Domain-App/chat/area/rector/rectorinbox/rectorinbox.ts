import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HeaderPoly} from '../../../request/header-poly/header-poly';

interface DeviceInfo {
  browser: string;
  deviceType: string;
  language: string;
  online: boolean;
  os: string;
  platform: string;
  screenResolution: string;
  userAgent: string;
  vendor: string;
}

interface Message {
  id?: string;
  content: string;
  createdAt: any;
  device: DeviceInfo;
  recipientIds: string[];
  sender: string;
  status: string;
}
@Component({
  selector: 'app-rectorinbox',
  imports: [
    AsyncPipe,
    NgForOf,
    DatePipe,
    NgIf,
    NgClass,
    HeaderPoly
  ],
  templateUrl: './rectorinbox.html',
  styleUrl: './rectorinbox.css'
})
export class Rectorinbox {
  messages$!: Observable<Message[]>;
  selectedMessage: Message | null = null;
  showModal = false;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const messagesCollection = collection(this.firestore, 'RECTOR'); // replace 'messages' with your collection name
    this.messages$ = collectionData(messagesCollection, { idField: 'id' }) as Observable<Message[]>;
  }

  viewMessage(message: Message) {
    this.selectedMessage = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedMessage = null;
  }

  async deleteMessage(id: string) {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(this.firestore, 'messages', id));
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  }
}
