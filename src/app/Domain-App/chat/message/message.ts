import { Component, Input, signal } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  Timestamp,
  doc,
  setDoc,
  updateDoc,
  increment
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import {StudentContextService} from '../../../services/student-context';

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
  submitting = false;
  constructor(private firestore: Firestore,private studentContext: StudentContextService) {}
  student: any;
  ngOnInit() {
    this.student = this.studentContext.student();
    console.log('Loaded student:', this.student);
  }
  /** ✅ Helper function to detect device/browser info */
  private getDeviceData() {
    const userAgent = navigator.userAgent || '';
    const platform = navigator.platform || 'unknown';
    const vendor = navigator.vendor || 'unknown';

    // Simple OS detection
    let os = 'Unknown OS';
    if (/windows/i.test(userAgent)) os = 'Windows';
    else if (/android/i.test(userAgent)) os = 'Android';
    else if (/linux/i.test(userAgent)) os = 'Linux';
    else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS';
    else if (/mac/i.test(userAgent)) os = 'MacOS';

    // Simple browser detection
    let browser = 'Unknown Browser';
    if (/chrome|crios/i.test(userAgent)) browser = 'Chrome';
    else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
    else if (/edg/i.test(userAgent)) browser = 'Edge';
    else if (/opr\//i.test(userAgent)) browser = 'Opera';

    // Determine device type
    let deviceType = 'Desktop';
    if (/mobile/i.test(userAgent)) deviceType = 'Mobile';
    else if (/tablet/i.test(userAgent)) deviceType = 'Tablet';

    // Screen information
    const screenResolution = `${window.screen.width}x${window.screen.height}`;

    return {
      browser,
      os,
      deviceType,
      platform,
      vendor,
      screenResolution,
      userAgent,
      language: navigator.language || 'unknown',
      online: navigator.onLine
    };
  }

  /** ✅ Main message sender */
  async sendMessage() {
    console.log("🟢 Step 0: Send button clicked");

    if (!this.messageContent.trim()) {
      console.warn("⚠️ Empty message, nothing to send");
      return;
    }

    this.submitting = true;
    const now = new Date();
    const recipientIds = this.contacts.map(c => c.name);
    const deviceData = this.getDeviceData();

    const messageData = {
      sender: 'System',
      recipientIds,
      content: this.messageContent,
      status: 'SENT',
      createdAt: Timestamp.fromDate(now),
      device: deviceData,
      student: {
        name: this.studentContext.student()?.name || '',
        registrationNumber: this.studentContext.student()?.registrationNumber || '',
        location: this.studentContext.student()?.location || ''
      }
    };


    let sentDocId: string | null = null;
    let finalStatus = 'FAILED';
    let errorMessage: string | null = null;

    try {
      // Add message to main collection
      const colRef = collection(this.firestore, this.collection);
      const sentRef = await addDoc(colRef, messageData);
      sentDocId = sentRef.id;
      finalStatus = 'SENT';
      console.log("🟢 Message saved with ID:", sentDocId);

      // Log in ADMIN_TRACK_MESSAGE
      const adminRef = collection(this.firestore, 'ADMIN_TRACK_MESSAGE');
      await addDoc(adminRef, { ...messageData, originalCollection: this.collection, originalDocId: sentDocId });

      // Track message
      const trackRef = collection(this.firestore, 'messagesTrack');
      await addDoc(trackRef, { ...messageData, originalCollection: this.collection, originalDocId: sentDocId, trackedAt: Timestamp.fromDate(now) });

      // Update STATISTIC
      const monthNames = [
        'january','february','march','april','may','june',
        'july','august','september','october','november','december'
      ];
      const currentMonth = monthNames[now.getMonth()];
      const statsDocRef = doc(this.firestore, 'STATISTIC', 'messageStats');

      await setDoc(statsDocRef, {
        january: 0, february: 0, march: 0, april: 0,
        may: 0, june: 0, july: 0, august: 0,
        september: 0, october: 0, november: 0, december: 0,
        RECTOR: 0, MISCONDUCT: 0, SECURITY: 0, STUDENTS_AFFAIRS: 0
      }, { merge: true });

      await updateDoc(statsDocRef, { [currentMonth]: increment(1) });
      const specialCollections = ["RECTOR", "MISCONDUCT", "SECURITY", "STUDENTS_AFFAIRS"];
      if (specialCollections.includes(this.collection)) {
        await updateDoc(statsDocRef, { [this.collection]: increment(1) });
      }

    } catch (err: any) {
      console.error("❌ Error during send process:", err);
      errorMessage = err.message || JSON.stringify(err);
    }

    // Always log attempts
    const attemptsRef = collection(this.firestore, 'messageAttempts');
    await addDoc(attemptsRef, {
      status: finalStatus,
      originalCollection: this.collection,
      originalDocId: sentDocId,
      errorMessage,
      attemptedAt: Timestamp.fromDate(now),
      device: deviceData
    });

    this.messageContent = '';
    this.submitting = false;
    console.log("🎉 Message process finished");
  }
  // 🔹 Sidebar Navigation Controls
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
