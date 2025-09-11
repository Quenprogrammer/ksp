import {Component, Input, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Message} from '../message/message';
import {Modal} from '../../../shared/modal';
import {NgForOf, NgIf} from '@angular/common';
import {HeaderPoly} from './header-poly/header-poly';

@Component({
  selector: 'app-request',
  imports: [
    RouterLink,
    Message,
    Modal,
    NgForOf,
    NgIf,
    HeaderPoly
  ],
  templateUrl: './request.html',
  styleUrl: './request.scss'
})
export class Request {
  deviceModal = signal(false);
  closeModal2() {
    this. deviceModal.set(false);
  }
  requests=90;
  pending=30
  cleared=30
  universityRequests = [
    {
      title: "Result Request",
      icon: "chatIcons/result.png",
      description: "A formal request submitted by students who need access to their academic performance records for a given semester or academic session. This may include obtaining a statement of results for personal reference, official documentation for employment, or verification purposes. The process typically requires validation by the department and approval from the exams and records unit."
    },
    {
      title: "Transcript Request",
      icon: "chatIcons/transcript2.png",
      description: "An application to obtain official academic transcripts containing a detailed record of courses taken, grades earned, and academic standing. Transcripts may be required for further studies, professional certification, or foreign admissions. Requests can be processed for local institutions or international destinations, often requiring postal dispatch or electronic submission through recognized platforms."
    },
    {
      title: "Certificate Request",
      icon: "chatIcons/certificate.png",
      description: "A request for the issuance of an original certificate upon successful completion of a program. This may include an attestation of certificate, temporary letter of completion, or official replacement in cases of loss or damage. Certificates are usually collected after clearance from the institution’s academic and financial departments."
    },
    {
      title: "Change of Course/Department Request",
      icon: "chatIcons/course.jpeg",
      description: "An application by students who wish to switch from one course or department to another within the institution. Such requests are often motivated by academic interests, career goals, or performance challenges. The process requires approval from academic advisers, departmental heads, and the registrar’s office, and is usually subject to available slots and academic regulations."
    },
    {
      title: "Request for Remarking/Review of Result",
      icon: "chatIcons/remarking.png",
      description: "A formal petition submitted when a student believes there has been an error, omission, or unfair grading in an examination. The request prompts an independent review or remarking of the submitted scripts by a designated panel or external examiner. Outcomes may confirm the original grade or result in an adjustment if an error is discovered."
    },
    {
      title: "Request for Extension of Studies",
      icon: "chatIcons/studentExtension.png",
      description: "An application made by students who require additional time to complete their academic program. This may arise from medical conditions, personal challenges, financial difficulties, or academic probation. Approval usually comes from the faculty board and the senate, with conditions such as maintaining academic standing and paying applicable fees."
    },
    {
      title: "Request for Academic Transcript Evaluation",
      icon: "chatIcons/transcript.png",
      description: "A request commonly submitted by transfer students or applicants from other institutions. It involves a review and assessment of previously earned credits, grades, and courses to determine eligibility for transfer into the new program. The evaluation ensures that only equivalent and approved courses are credited toward the student’s current academic progress."
    },
    {
      title: "Request for Correction of Name/Date of Birth",
      icon: "chatIcons/name.jpeg",
      description: "An application to correct errors or inconsistencies in official student records, such as misspelled names, incorrect date of birth, or other personal details. Supporting documents such as birth certificates, affidavits, or national identity cards are usually required. Once approved, the corrections are reflected in all official academic records and certificates."
    }
  ];

  @Input() icon: string = '';
  @Input() header: string = ' ';
  @Input() description: string = ' ';
    width: string = '600px';
    height: string = '500px';

  selectedItem: any = null;

  openModal(item: any) {
    this.selectedItem = item;   // store clicked item
    this.deviceModal.set(true); // open modal
  }


}
