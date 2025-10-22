import { Component, Input, signal } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, Timestamp, doc, setDoc, updateDoc, increment } from '@angular/fire/firestore';
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
  @Input() collection: string = 'DEFAULTCollection';
  @Input() depCOLOR: string = '';

  messageContent: string = '';

  constructor(private firestore: Firestore) {}

  async sendMessage() {
    console.log("🟢 Step 0: Send button clicked");

    if (!this.messageContent.trim()) {
      console.warn("⚠️ Empty message, nothing to send");
      return;
    }

    const recipientIds = this.contacts.map(c => c.name);
    console.log("➡️ Recipients:", recipientIds);

    const colRef = collection(this.firestore, this.collection);

    const now = new Date();
    const messageData = {
      sender: 'System', // replace with actual user later
      recipientIds,
      content: this.messageContent,
      status: 'SENT',
      createdAt: Timestamp.fromDate(now)
    };

    let sentDocId: string | null = null;
    let finalStatus = 'FAILED';
    let errorMessage: string | null = null;

    try {
      // ✅ Add message — collection will be created automatically if missing
      const sentRef = await addDoc(colRef, messageData);
      sentDocId = sentRef.id;
      finalStatus = 'SENT';
      console.log("🟢 Message saved with ID:", sentDocId);

      // ✅ Log in ADMIN_TRACK_MESSAGE
      const adminRef = collection(this.firestore, 'ADMIN_TRACK_MESSAGE');
      await addDoc(adminRef, { ...messageData, originalCollection: this.collection, originalDocId: sentDocId });

      // ✅ Track message
      const trackRef = collection(this.firestore, 'messagesTrack');
      await addDoc(trackRef, { ...messageData, originalCollection: this.collection, originalDocId: sentDocId, trackedAt: Timestamp.fromDate(now) });

      // ✅ Update STATISTIC
      const monthNames = [
        'january','february','march','april','may','june',
        'july','august','september','october','november','december'
      ];
      const currentMonth = monthNames[now.getMonth()];
      const statsDocRef = doc(this.firestore, 'STATISTIC', 'messageStats');

      // Initialize if missing
      await setDoc(statsDocRef, {
        january: 0, february: 0, march: 0, april: 0,
        may: 0, june: 0, july: 0, august: 0,
        september: 0, october: 0, november: 0, december: 0,
        RECTOR: 0, MISCONDUCT: 0, SECURITY: 0, STUDENTS_AFFAIRS: 0
      }, { merge: true });

      // Increment month field
      await updateDoc(statsDocRef, { [currentMonth]: increment(1) });

      // Increment special field if needed
      const specialCollections = ["RECTOR", "MISCONDUCT", "SECURITY", "STUDENTS_AFFAIRS"];
      if (specialCollections.includes(this.collection)) {
        await updateDoc(statsDocRef, { [this.collection]: increment(1) });
      }

    } catch (err: any) {
      console.error("❌ Error during send process:", err);
      errorMessage = err.message || JSON.stringify(err);
    }

    // ✅ Always log attempts
    const attemptsRef = collection(this.firestore, 'messageAttempts');
    await addDoc(attemptsRef, {
      status: finalStatus,
      originalCollection: this.collection,
      originalDocId: sentDocId,
      errorMessage,
      attemptedAt: Timestamp.fromDate(now)
    });

    this.messageContent = '';
    console.log("🎉 Message process finished");
  }


  class = 'mt-3 lead ';
  nav = signal(false);
  navOpenButton = signal(true);
  navCloseButton = signal(false);

  openNav() {
    this.nav.set(true);
    this.navCloseButton.set(true);
    this.navOpenButton.set(false);
  }
  closeNav() {
    this.nav.set(false);
    this.navOpenButton.set(true);
    this.navCloseButton.set(false);
  }
}
