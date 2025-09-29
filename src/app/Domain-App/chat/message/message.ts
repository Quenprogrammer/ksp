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
      sender: 'System', // replace with actual user later
      recipientIds,
      content: this.messageContent,
      createdAt: Timestamp.fromDate(now)
    };

    let finalStatus = 'FAILED';
    let sentDocId: string | null = null;
    let errorMessage: string | null = null;

    try {
      if (snapshot.empty) {
        console.error(`❌ ERROR: Collection "${this.collection}" does not exist.`);
        errorMessage = `Collection "${this.collection}" does not exist`;
      } else {
        console.log("🟢 Step 3: Collection exists, preparing message...");
        const messageData = { ...baseData, status: 'SENT' };

        console.log("🟢 Step 4: Adding SENT message...");
        const sentRef = await addDoc(colRef, messageData);
        sentDocId = sentRef.id;
        console.log("➡️ SENT message saved with ID:", sentDocId);

        console.log("🟡 Step 5: Logging SENT into ADMIN_TRACK_MESSAGE...");
        const adminRef = collection(this.firestore, 'ADMIN_TRACK_MESSAGE');
        await addDoc(adminRef, {
          ...messageData,
          originalCollection: this.collection,
          originalDocId: sentDocId
        });
        console.log("✅ SENT log added in ADMIN_TRACK_MESSAGE");

        console.log("🟡 Step 6: Saving full message content to messagesTrack...");
        const trackRef = collection(this.firestore, 'messagesTrack');
        await addDoc(trackRef, {
          ...messageData,
          originalCollection: this.collection,
          originalDocId: sentDocId,
          trackedAt: Timestamp.fromDate(now)
        });
        console.log("✅ Message content tracked in messagesTrack");

        finalStatus = 'SENT';

        // ✅ Step 7: Update STATISTIC (month + special fields)
        try {
          const monthNames = [
            'january','february','march','april','may','june',
            'july','august','september','october','november','december'
          ];
          const currentMonth = monthNames[now.getMonth()]; // e.g., 'september'
          console.log(`📊 Updating STATISTIC for month: ${currentMonth}`);

          const statsDocRef = doc(this.firestore, 'STATISTIC', 'messageStats');

          // Initialize with months + special collections if missing
          await setDoc(statsDocRef, {
            january: 0, february: 0, march: 0, april: 0,
            may: 0, june: 0, july: 0, august: 0,
            september: 0, october: 0, november: 0, december: 0,
            RECTOR: 0, MISCONDUCT: 0, SECURITY: 0, STUDENTS_AFFAIRS: 0
          }, { merge: true });

          // Increment month field
          await updateDoc(statsDocRef, { [currentMonth]: increment(1) });
          console.log(`✅ STATISTIC.messageStats.${currentMonth} incremented by 1`);

          // Increment special field if collection is one of them
          const specialCollections = ["RECTOR", "MISCONDUCT", "SECURITY", "STUDENTS_AFFAIRS"];
          if (specialCollections.includes(this.collection)) {
            await updateDoc(statsDocRef, { [this.collection]: increment(1) });
            console.log(`✅ STATISTIC.messageStats.${this.collection} incremented by 1`);
          }
        } catch (statsErr) {
          console.error("❌ Failed to update STATISTIC:", statsErr);
        }
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
    console.log(`📌 Final status logged to Firestore: ${finalStatus}`);

    console.log("🎉 Message process finished");
    this.messageContent = '';
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
