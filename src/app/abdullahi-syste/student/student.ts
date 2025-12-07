import {Component, ElementRef, HostListener, signal, ViewChild} from '@angular/core';
import {ApprovalPage} from "../../Domain-App/loan-system/users/approval-page/approval-page";
import {ChatHeader} from "../../Domain-App/chat/chat-header/chat-header";
import {MenuCardHeader} from "../../Domain-App/chat/menu-card-header/menu-card-header";
import {Modal} from "../../shared/modal";
import {NgForOf, NgIf} from "@angular/common";
import {RatingHome} from "../../Domain-App/chat/rating-home/rating-home";
import {Router, RouterLink} from "@angular/router";
import {ViewProfile} from "../../Domain-App/chat/view-profile/view-profile";
import {NetworkService} from '../../services/network.service';
import {FcapStudentSettings} from './fcap-student-settings/fcap-student-settings';

@Component({
  selector: 'app-student',
  imports: [
    ApprovalPage,
    ChatHeader,
    MenuCardHeader,
    Modal,
    NgForOf,
    NgIf,
    RatingHome,
    RouterLink,
    ViewProfile,
    FcapStudentSettings
  ],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class Student {
  // Main dropdowns
  isAppsOpen = signal(false);
  requestModal = signal(false);

  isAccountOpen = signal(false);
  mobileMenu = signal(false);

  // Submenus inside Account dropdown
  isStatusOpen = signal(false);
  isCustomizationOpen = signal(false);

  @ViewChild('appsMenu') appsMenuRef!: ElementRef;
  @ViewChild('appsBtn') appsBtnRef!: ElementRef;
  @ViewChild('accountMenu') accountMenuRef!: ElementRef;
  @ViewChild('accountBtn') accountBtnRef!: ElementRef;



  constructor(private networkService: NetworkService,private router: Router) {

  }





  closeAll() {
    this.isAppsOpen.set(false);
    this.isAccountOpen.set(false);
    this.isStatusOpen.set(false);
    this.isCustomizationOpen.set(false);
  }

  // Close on outside click
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const t = e.target as Node;
    if (
      !this.appsMenuRef?.nativeElement.contains(t) &&
      !this.appsBtnRef?.nativeElement.contains(t) &&
      !this.accountMenuRef?.nativeElement.contains(t) &&
      !this.accountBtnRef?.nativeElement.contains(t)
    ) {
      this.closeAll();
    }
  }

  // Close on Escape
  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeAll();
  }
  MENU_ITEMS = [



    {name: 'Inbox', icon: 'chatIcons/settings/img_2.png', link: '/inbox'},

    {name: 'View departments', icon: 'chatIcons/registration.svg', link: '/departments-students'},

    {name: 'Administrators', icon: 'chatIcons/admin.svg', link: '/administrators'},
      {name: 'Security', icon: 'chatIcons/settings/img_4.png', link: '/security'},
      {name: 'Profile', icon: 'chatIcons/settings/img_3.png', link: '/StudentSettingsProfile'},

  ];


  openModal = signal(false);
  openModal2 = signal(false);
  settings = signal(false);
  deviceModal = signal(false);
  width='500px'
  width2='900px'
  height='430px'
  height3='530px'
  height2='600px'
  closeModal() {
    this. openModal.set(false);
  }
  closeModal2() {
    this. openModal2.set(false);
  }
  cloeOthersModal() {
    this.settings.set(false);
  }
  cloeRequestModal() {
    this.requestModal.set(false);
  }
  cloeMobileMenu() {
    this.mobileMenu.set(false);
  }



  kanoPolyComplaintSystem = [
    {
      title: "Respectful Language",
      description: "All complaints must be expressed in polite and respectful language. Offensive, abusive, or threatening remarks are strictly prohibited and may result in disciplinary action. Respectful communication ensures that issues are taken seriously and resolved fairly."
    },
    {
      title: "Proper Identification",
      description: "Every complainant must provide their full name, matriculation or staff number, department, and up-to-date contact details. This ensures proper verification and accountability. Anonymous or incomplete submissions may delay or prevent resolution."
    },
    {
      title: "Genuine Complaints Only",
      description: "Only truthful and factual complaints should be submitted. Any attempt to mislead, exaggerate, or submit false information will be considered misconduct. Genuine complaints help the institution improve services and maintain fairness for all stakeholders."
    },
    {
      title: "Official Channels",
      description: "Complaints must be submitted through Kano State Polytechnic’s designated channels such as the official portal, complaint boxes, or relevant administrative offices. Submissions through unofficial means, like social media or word-of-mouth, may not be recognized. Using official channels ensures proper tracking and resolution."
    },
    {
      title: "Supporting Evidence",
      description: "Where possible, complaints should be supported with facts, dates, documents, photos, or any verifiable evidence. This strengthens the credibility of the complaint and makes investigations more effective. Unsupported claims may be difficult to resolve."
    },
    {
      title: "Confidentiality",
      description: "All complaints will be handled with the highest level of confidentiality. The identity of complainants will be protected to encourage openness and honesty. Information will only be shared with relevant authorities directly responsible for resolving the issue."
    },
    {
      title: "Non-Retaliation",
      description: "Students, staff, and management are strictly prohibited from retaliating against individuals who submit genuine complaints. Retaliation can include intimidation, harassment, or victimization. Anyone found guilty of such actions will face disciplinary measures."
    },
    {
      title: "Timely Response",
      description: "All complaints will be acknowledged within 48 hours of submission, with updates provided as investigations progress. Resolution time may vary depending on the complexity of the issue, but delays must be communicated to the complainant. Timeliness builds trust in the system."
    },
    {
      title: "Escalation Process",
      description: "Complaints unresolved at the departmental level can be escalated to higher authorities such as the Dean, Rector, or Polytechnic Council. Escalation should follow due process and only after lower levels of resolution have been attempted. This ensures fairness and proper hierarchy in resolving disputes."
    },
    {
      title: "Anonymous Complaints",
      description: "Anonymous complaints will generally not be acted upon unless they contain strong, verifiable evidence of misconduct, harassment, or safety risks. While identity disclosure is encouraged, the system remains open to serious anonymous submissions in the interest of community safety."
    },
    {
      title: "Follow-Up",
      description: "Complainants are encouraged to follow up politely through the official complaint office if responses are delayed. Aggressive or disruptive follow-ups may hinder progress. Following up responsibly shows commitment and helps track resolution progress."
    },
    {
      title: "No Public Disruption",
      description: "Before exhausting internal procedures, complaints must not be taken to social media, public protests, or other disruptive actions. Doing so undermines the institution’s processes and may lead to disciplinary action. Proper resolution must always begin within the Polytechnic’s complaint system."
    }
  ];

  student: any = null;

  ngOnInit() {
    // Fetch student data from router state
    const nav = history.state;
    if (nav && nav.student) {
      this.student = nav.student;
      console.log('Student data received:', this.student);
    } else {
      console.warn('No student data received from login.');
    }
  }
  trackByName(index: number, item: any): string {
    return item.name;
  }

}
