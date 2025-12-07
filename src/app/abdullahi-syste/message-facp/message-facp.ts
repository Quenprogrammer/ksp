import { Component } from '@angular/core';
import {collectionData, Firestore} from '@angular/fire/firestore';
import {collection} from 'firebase/firestore';
import {DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {Modal} from '../../shared/modal';
interface Message {
  id?: string;
  content: string;
  createdAt: any;
  device: any;
  browser: string;
  deviceType: string;
  language: string;
  online: boolean;
  os: string;
  platform: string;
  screenResolution: string;
  userAgent: string;
  vendor: string;
  recipientIds: string[];
  sender: string;
  status: string;
}

@Component({
  selector: 'app-message-facp',
  imports: [
    DatePipe,
    Modal,
    NgIf,
    SlicePipe,
    NgForOf
  ],
  templateUrl: './message-facp.html',
  styleUrl: './message-facp.css'
})
export class MessageFACP {
  messages: Message[] = [];
  selectedMessage: Message | null = null;
  modalOpen = false; // track modal state
  height3 = '500px'; // modal height

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const messagesRef = collection(this.firestore, 'FCAPT_SECURITY');
    collectionData(messagesRef, { idField: 'id' }).subscribe(data => {
      this.messages = data as Message[];
    });
  }

  openMessageModal(message: Message) {
    this.selectedMessage = message;
    this.modalOpen = true;
  }

  closeMessageModal() {
    this.selectedMessage = null;
    this.modalOpen = false;
  }
}
