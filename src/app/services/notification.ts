// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning' | 'system' | 'transaction';
  recipientId: string;
  read: boolean;
  timestamp: string;   // ISO string
  actionUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private firestore: Firestore) {}

  async addNotification(notification: NotificationData): Promise<void> {
    try {
      const notifRef = doc(
        collection(this.firestore, 'notifications'),
        notification.id
      );

      await setDoc(notifRef, notification, { merge: true });
      console.log('✅ Notification saved:', notification);
    } catch (error) {
      console.error('❌ Error saving notification:', error);
      throw error;
    }
  }
}
