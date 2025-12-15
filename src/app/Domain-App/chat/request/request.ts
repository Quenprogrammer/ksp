import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Modal } from '../../../shared/modal';
import { NgForOf, NgIf } from '@angular/common';
import { HeaderPoly } from './header-poly/header-poly';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    RouterLink,
    Modal,
    NgForOf,
    NgIf,
    HeaderPoly,
    FormsModule
  ],
  templateUrl: './request.html',
  styleUrls: ['./request.scss']
})
export class Request {
  deviceModal = signal(false);
  selectedItem: any = null;
  messageText: string = '';
  submitting = false;

  width: string = '600px';
  height: string = '500px';

  // **University requests array**
  universityRequests = [
    {
      title: "Result Request",
      icon: "chatIcons/result.png",
      description: "A formal request submitted by students who need access to their academic performance records for a given semester or academic session..."
    },
    {
      title: "Transcript Request",
      icon: "chatIcons/transcript2.png",
      description: "An application to obtain official academic transcripts containing a detailed record of courses taken, grades earned, and academic standing..."
    },
    {
      title: "Certificate Request",
      icon: "chatIcons/certificate.png",
      description: "A request for the issuance of an original certificate upon successful completion of a program..."
    },
    {
      title: "Change of Course/Department Request",
      icon: "chatIcons/course.jpeg",
      description: "An application by students who wish to switch from one course or department to another within the institution..."
    },
    {
      title: "Request for Remarking/Review of Result",
      icon: "chatIcons/remarking.png",
      description: "A formal petition submitted when a student believes there has been an error, omission, or unfair grading in an examination..."
    },
    {
      title: "Request for Extension of Studies",
      icon: "chatIcons/studentExtension.png",
      description: "An application made by students who require additional time to complete their academic program..."
    },
    {
      title: "Request for Academic Transcript Evaluation",
      icon: "chatIcons/transcript.png",
      description: "A request commonly submitted by transfer students or applicants from other institutions..."
    },
    {
      title: "Request for Correction of Name/Date of Birth",
      icon: "chatIcons/name.jpeg",
      description: "An application to correct errors or inconsistencies in official student records, such as misspelled names or incorrect date of birth..."
    }
  ];

  constructor(private firestore: Firestore) {}

  closeModal2() {
    this.deviceModal.set(false);
    this.selectedItem = null;
    this.messageText = '';
  }

  openModal(item: any) {
    this.selectedItem = item;
    this.deviceModal.set(true);
  }

  async sendRequest() {
    if (!this.selectedItem || !this.messageText) return;

    this.submitting = true;

    try {
      const requestsRef = collection(this.firestore, 'universityRequests');
      await addDoc(requestsRef, {
        title: this.selectedItem.title,
        description: this.messageText,
        createdAt: serverTimestamp()
      });
      alert('Request sent successfully!');
      this.closeModal2();
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request.');
    } finally {
      this.submitting = false;
    }
  }

}
