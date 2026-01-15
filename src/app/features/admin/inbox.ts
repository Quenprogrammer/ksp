import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { AsyncPipe, CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import {Header} from '../shared/header/header';

interface ContactMessage {
  id?: string;
  firstName?: string;
  lastName?: string;
  contactPerson?: string;
  company?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: any;
  type: 'customer' | 'retailer';
}

@Component({
  selector: 'app-inbox',
  imports: [
    AsyncPipe,
    NgForOf,
    DatePipe,
    NgIf,
    CommonModule,
    Header
  ],
  template: `
    <app-header [title]="'Messages'" ></app-header>
    <div class="container">
      <div class="col">
        <div class="ps-lg-3 ps-xl-0">


          <!-- Messages list -->
          <div *ngFor="let message of messages$ | async; let i = index" class="border-bottom py-4">

            <!-- Responsive nav for sender info and actions -->
            <div class="nav flex-column flex-sm-row align-items-start align-sm-items-center justify-content-between pb-1 mb-3">

              <div class="d-flex align-items-center gap-3 mb-2 mb-sm-0">
                <h2 class="h6 mb-0">
                  {{ getSenderName(message) }}
                  <small class="text-muted d-block fs-sm fw-normal">{{ message.email }}</small>
                  <p class=" fs-xs mt-1">
                    {{ message.timestamp?.toDate() | date: 'medium' }}
                  </p>
                </h2>

                <span class="badge text-bg-info rounded-pill" [class.text-bg-warning]="message.type === 'retailer'">
              {{ message.type === 'customer' ? 'Customer' : 'Retailer' }}
            </span>

              </div>

              <div class="d-flex align-items-center gap-2">
                <!-- Contact Details Toggle -->
                <button class="nav-link text-decoration-underline p-0 border-0 bg-transparent"
                        (click)="toggleContactDetails(i)"
                        [class.text-primary]="isContactDetailsOpen(i)"
                        [class.text-muted]="!isContactDetailsOpen(i)">
                  {{ isContactDetailsOpen(i) ? 'Hide Details' : 'Contact Details' }}
                </button>
                <span class="text-muted">|</span>
                <button class="nav-link text-decoration-underline p-0 text-danger border-0 bg-transparent"
                        (click)="deleteMessage(message.id!)">
                  Delete
                </button>
              </div>

            </div>

            <div class="row">
              <div class="col-md-8">
                <h6 class="mb-2">Subject: {{ message.subject }}</h6>
                <p class="fs-sm mb-3 text-break">{{ message.message }}</p>

                <div class="d-flex flex-wrap gap-3 fs-sm text-muted">
                  <span><strong>Phone:</strong> {{ message.phone || 'Not provided' }}</span>
                  <span *ngIf="message.company"><strong>Company:</strong> {{ message.company }}</span>
                </div>
              </div>

              <!-- Contact Details Card (Collapsible with animation) -->
              <div class="col-md-4">
                <div class="contact-details-card"
                     [class.show]="isContactDetailsOpen(i)"
                     [class.hide]="!isContactDetailsOpen(i)">
                  <div class="card border-0 bg-light">
                    <div class="card-body">
                      <h6 class="card-title">Contact Details</h6>
                      <ul class="list-unstyled fs-sm mb-0">
                        <li><strong>Email:</strong> {{ message.email }}</li>
                        <li *ngIf="message.phone"><strong>Phone:</strong> {{ message.phone }}</li>
                        <li *ngIf="message.company"><strong>Company:</strong> {{ message.company }}</li>
                        <li><strong>Type:</strong> {{ message.type }}</li>
                        <li><strong>Received:</strong> {{ message.timestamp?.toDate() | date: 'short' }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Empty state -->
          <div *ngIf="(messages$ | async)?.length === 0" class="text-center py-5">
            <div class="py-5">
              <i class="bi bi-inbox display-4 text-muted mb-3"></i>
              <h3 class="h5 text-muted">No messages yet</h3>
              <p class="text-muted">When customers or retailers contact you, their messages will appear here.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,

  styles: [`
    .contact-details-card {
      transition: all 0.3s ease-in-out;
      overflow: hidden;
    }

    .contact-details-card.hide {
      max-height: 0;
      opacity: 0;
      transform: translateX(20px);
    }

    .contact-details-card.show {
      max-height: 300px;
      opacity: 1;
      transform: translateX(0);
    }
  `]
})
export class Inbox implements OnInit {
  messages$: Observable<ContactMessage[]>;
  openContactDetails: Set<number> = new Set();

  constructor(private firestore: Firestore) {
    const messagesCollection = collection(this.firestore, 'contactMessages');
    this.messages$ = collectionData(messagesCollection, { idField: 'id' }) as Observable<ContactMessage[]>;
  }

  ngOnInit(): void {}

  getSenderName(message: ContactMessage): string {
    if (message.type === 'customer') {
      return `${message.firstName} ${message.lastName}`;
    } else {
      return message.contactPerson || message.company || 'Retailer Contact';
    }
  }

  toggleContactDetails(index: number): void {
    if (this.openContactDetails.has(index)) {
      this.openContactDetails.delete(index);
    } else {
      this.openContactDetails.add(index);
    }
  }

  isContactDetailsOpen(index: number): boolean {
    return this.openContactDetails.has(index);
  }

  async deleteMessage(messageId: string) {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        const messageDoc = doc(this.firestore, 'contactMessages', messageId);
        await deleteDoc(messageDoc);
        console.log('Message deleted successfully');
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Error deleting message. Please try again.');
      }
    }
  }
}
