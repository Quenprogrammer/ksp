import { Component, Input } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, Timestamp } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './message.html',
  styleUrls: ['./message.scss']
})
export class Message {
  @Input() header: string = 'School Of Technology';
  @Input() description: string = 'Description Here';
  @Input() department: string = 'KSP complain System';
  @Input() personContact: string = 'Departmental C';
  @Input() body: string = 'Department of computer science';
  @Input() messagePadPlaceHolder: string = 'Type message to be sent';
  @Input() logo: string = 'chatIcons/poly/poly.png';
  @Input() sidebar = true;
  @Input() sidebarClass: string = 'col-lg-8';
  @Input() textColor: string = 'black';
  @Input() backgroundColor: string = 'white';
  @Input() paragraphClass: string = 'mt-3 lead';
  @Input() contacts: { name: string; collection: string; icon: string }[] = [];
  @Input() collection: string = 'messages33';
  @Input() depCOLOR: string = '';

  messageContent: string = '';

  constructor(private firestore: Firestore) {}
  async sendMessage() {
    console.log("🟢 Step 0: Send button clicked");

    if (!this.messageContent.trim()) {
      console.warn("⚠️ Empty message, nothing to send");
      return;
    }

    console.log("🟡 Step 1: Preparing recipient list...");
    const recipientIds = this.contacts.map(c => c.name);
    console.log("➡️ Recipients:", recipientIds);

    console.log(`🟡 Step 2: Checking collection "${this.collection}" existence...`);
    const colRef = collection(this.firestore, this.collection);
    const snapshot = await getDocs(query(colRef));

    const now = new Date();
    const baseData = {
      sender: 'System', // replace with actual user later if needed
      recipientIds,
      content: this.messageContent,
      createdAt: Timestamp.fromDate(now)
    };

    if (snapshot.empty) {
      console.error(`❌ ERROR: Collection "${this.collection}" does not exist. Saving to FAILED_MESSAGE...`);

      const failedRef = collection(this.firestore, 'FAILED_MESSAGE');
      await addDoc(failedRef, {
        ...baseData,
        status: 'FAILED',
        originalCollection: this.collection,
        errorMessage: `Collection "${this.collection}" does not exist`
      });

      console.log("✅ Saved failed attempt in FAILED_MESSAGE");
      this.messageContent = '';
      return;
    }

    console.log("🟢 Step 3: Collection exists, preparing message...");
    const messageData = {
      ...baseData,
      status: 'SENT'
    };

    console.log("🟢 Step 4: Adding SENT message...");
    const sentRef = await addDoc(colRef, messageData);
    console.log("➡️ SENT message saved with ID:", sentRef.id);

    console.log("🟡 Step 5: Logging SENT into ADMIN_TRACK_MESSAGE...");
    const adminRef = collection(this.firestore, 'ADMIN_TRACK_MESSAGE');
    await addDoc(adminRef, {
      ...messageData,
      originalCollection: this.collection,
      originalDocId: sentRef.id
    });
    console.log("✅ SENT log added in ADMIN_TRACK_MESSAGE");

    console.log("🎉 Message sent & tracked successfully");
    this.messageContent = '';
  }




  class = 'mt-3 lead ';
}
