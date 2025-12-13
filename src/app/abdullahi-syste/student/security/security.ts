
import {Message} from '../../../Domain-App/chat/message/message';
import {Component, ElementRef, Input, signal, ViewChild} from '@angular/core';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf, NgFor, NgForOf} from '@angular/common';
import {Modal} from '../../../shared/modal';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-security',
  imports: [
    Message,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    Modal,
    RouterLink
  ],
  templateUrl: './security.html',
  styleUrl: './security.css'
})
export class FCAPSecurity {
  mobileMenu = signal(false);
  cloeOthersModal() {
    this.mobileMenu.set(false);
    this.stopCamera()
  }
  rectorImage='loanSystemIcons/logo.jpg'
  body='Official FCAPT SECURITY'
  name='FCAPT Security'
  description = `This page provides students and staff with a secure platform to report safety and security-related issues within the federal college of agricultural studies.
It is designed to ensure a safe and peaceful campus environment by allowing individuals to quickly raise concerns that require the attention of the Security Department.

`;

  sidebar = 'col-lg-9 vh-100';



    @Input() messagePadPlaceHolder: string = 'Type message to be sent';
  @Input() logo: string = 'loanSystemIcons/fcaplogo2.png';
    @Input() sidebarClass: string = 'col-lg-8';
  @Input() textColor: string = 'black';
  @Input() backgroundColor: string = 'white';
  @Input() paragraphClass: string = 'mt-3 lead';
  @Input() contacts: { name: string; collection: string; icon: string }[] = [];
  @Input() collection: string = 'DEFAULTCollection';
  @Input() depCOLOR: string = '';

  messageContent: string = '';

  constructor(private firestore: Firestore) {}

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

    if (!this.messageContent.trim() && !this.photo) {
      console.warn("⚠️ Empty message and no photo, nothing to send");
      return;
    }

    const recipientIds = this.contacts.map(c => c.name);
    console.log("➡️ Recipients:", recipientIds);

    const colRef = collection(this.firestore, 'FCAPT_SECURITY');
    const now = new Date();
    const deviceData = this.getDeviceData();

    const messageData: any = {
      sender: this.student.name, // Replace later with actual user
      recipientIds,
      content: this.messageContent,
      status: 'SENT',
      createdAt: Timestamp.fromDate(now),
      device: deviceData
    };

    // ✅ Include photo if exists
    if (this.photo) {
      messageData.photo = this.photo; // base64 string
    }

    let sentDocId: string | null = null;
    let finalStatus = 'FAILED';
    let errorMessage: string | null = null;

    try {
      const sentRef = await addDoc(colRef, messageData);
      sentDocId = sentRef.id;
      finalStatus = 'SENT';
      console.log("🟢 Message saved with ID:", sentDocId);

      // Log in ADMIN_TRACK_MESSAGE
      const adminRef = collection(this.firestore, 'ADMIN_TRACK_MESSAGE');
      await addDoc(adminRef, { ...messageData, originalCollection: 'FCAPT_SECURITY', originalDocId: sentDocId });

      // Track message
      const trackRef = collection(this.firestore, 'messagesTrack');
      await addDoc(trackRef, { ...messageData, originalCollection: 'FCAPT_SECURITY', originalDocId: sentDocId, trackedAt: Timestamp.fromDate(now) });

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
      if (specialCollections.includes('SECURITY')) {
        await updateDoc(statsDocRef, { SECURITY: increment(1) });
      }

    } catch (err: any) {
      console.error("❌ Error during send process:", err);
      errorMessage = err.message || JSON.stringify(err);
    }

    // Log send attempts
    const attemptsRef = collection(this.firestore, 'messageAttempts');
    await addDoc(attemptsRef, {
      status: finalStatus,
      originalCollection: 'FCAPT_SECURITY',
      originalDocId: sentDocId,
      errorMessage,
      attemptedAt: Timestamp.fromDate(now),
      device: deviceData
    });

    // ✅ Clear message and photo after sending
    this.messageContent = '';
    this.photo = null;

    console.log("🎉 Message process finished");
  }

  // 🔹 Sidebar Navigation Controls
  class = 'mt-3 lead ';
  nav = signal(false);
  navOpenButton = signal(true);
  navCloseButton = signal(false);
  dropdownOpen = false;
  selectedOptionLabel: string = '';
  selectedLocation: string = '';

  securityOptions = [
    { label: 'Theft/Burglary', value: '🚨 Incident Type: Theft/Burglary\nLocation: ' },
    { label: 'Physical Assault', value: '🚨 Incident Type: Physical Assault\nLocation: ' },
    { label: 'Vandalism', value: '🚨 Incident Type: Vandalism\nLocation: ' },
    { label: 'Suspicious Person', value: '🚨 Incident Type: Suspicious Person\nDescription: ' },
    { label: 'Fire/Emergency', value: '🚨 EMERGENCY: Fire/Emergency\nLocation: ' },
    { label: 'Medical Emergency', value: '🚨 EMERGENCY: Medical Assistance\nLocation: ' },
    { label: 'Harassment', value: '🚨 Incident Type: Harassment\nDescription: ' },
    { label: 'Unauthorized Entry', value: '🚨 Incident Type: Unauthorized Entry\nLocation: ' },
    { label: 'Lost Property', value: '📝 Report: Lost Property\nItem: \nLast Seen: ' },
    { label: 'Found Property', value: '📝 Report: Found Property\nItem: \nLocation Found: ' }
  ];

// Locations for combobox
  locations = [
    'Library',
    'ND-Lab New Building',
    'HND Building',
    'CBT',
    'HND Lab',
    'Male Hostel',
    'Female Hostel',
    'ND Lab',
    'Auditorium',
    'Others'
  ];

// Toggle dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

// Select incident option
  selectOption(option: { label: string; value: string }) {
    this.selectedOptionLabel = option.label;

    // Append selected location if any
    const locationText = this.selectedLocation ? `Location: ${this.selectedLocation}` : '';
    const optionText = locationText ? option.value.replace('Location: ', locationText) : option.value;

    this.messageContent = this.messageContent
      ? `${this.messageContent}\n\n${optionText}`
      : optionText;

    // Close dropdown after selection
    this.dropdownOpen = false;

    // Focus back to textarea
    setTimeout(() => {
      const textarea = document.getElementById('incidentTextarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
      }
    }, 0);
  }

// Add or update location manually if user changes combobox
  onLocationChange() {
    if (!this.selectedLocation) return;

    // Replace previous Location in messageContent if present
    if (this.messageContent.includes('Location:')) {
      this.messageContent = this.messageContent.replace(/Location: .*/, `Location: ${this.selectedLocation}`);
    } else {
      // Append location if not present
      this.messageContent = this.messageContent
        ? `${this.messageContent}\nLocation: ${this.selectedLocation}`
        : `Location: ${this.selectedLocation}`;
    }
  }
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  stream: MediaStream | null = null;
  photo: string | null = null;

  // Start camera
  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.nativeElement.srcObject = this.stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera');
    }
  }

  // Snap photo
  snapPhoto() {
    if (!this.stream) return;
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) {
      context.drawImage(this.video.nativeElement, 0, 0, 320, 240);
      this.photo = this.canvas.nativeElement.toDataURL('image/png');
    }
  }

  // Stop camera
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  student: any = null;

  ngOnInit() {
    const storedStudent = localStorage.getItem('FACAPT_STUDENT_DATA');

    if (storedStudent) {
      this.student = JSON.parse(storedStudent);
    }
  }
}
