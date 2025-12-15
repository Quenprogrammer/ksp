import {Component, ElementRef, HostListener, signal, ViewChild, WritableSignal} from '@angular/core';

import {Router, RouterLink} from '@angular/router';
import {textColor} from '../../data/config';
import {Modal} from '../../shared/modal';
import {ChatHeader} from './chat-header/chat-header';
import {Others} from './others/others';
import {Device} from './device/device';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {NetworkService} from '../../services/network.service';
import {Request} from './request/request';
import {Network} from './component/network/network';

import {NetworkStatsComponent} from '../core/network-stats.component';

import {MenuCardHeader} from './menu-card-header/menu-card-header';
import {ApprovalPage} from '../loan-system/users/approval-page/approval-page';
import {AffiliateProfileComponent} from './settings/affiliates/settings/affiliate-profile/affiliate-profile.component';
import {RatingHome} from './rating-home/rating-home';
import {ViewProfile} from './view-profile/view-profile';
import {PolyDocCount} from './poly-doc-count/poly-doc-count';
import {StudentContextService} from '../../services/student-context';

@Component({
  selector: 'app-chat',
  imports: [
    RouterLink,
    Modal,
    ChatHeader,
    Others,
    Device,
    NgIf,
    Request,
    NgForOf,
    Network,

    NetworkStatsComponent,

    MenuCardHeader,
    ApprovalPage,
    AffiliateProfileComponent,
    RatingHome,
    ViewProfile,
    PolyDocCount,
    NgStyle,

  ],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat {
  students: any;
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



  constructor(private studentContext: StudentContextService,private networkService: NetworkService,private router: Router) {

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
    {name: 'Announcement', icon: 'post.svg', link: '/publicAnnouncment'},
    {name: 'Lecturers', icon: 'chatIcons/contact.svg', link: '/view-lecturers'},
    {name: 'Students', icon: 'chatIcons/settings/ConversationMinor.svg', link: '/findStudents'},

    {name: 'Departments', icon: 'chatIcons/registration.svg', link: '/departments-students'},
    {name: 'Student affairs', icon: 'chatIcons/settings/NoteMinor.svg', link: '/student-affairs'},

    {name: 'Administrators', icon: 'chatIcons/admin.svg', link: '/administrators'},
       {name: 'Request', icon: 'chatIcons/settings/img_5.png', link: '/request'},
        {name: 'Security', icon: 'chatIcons/settings/img_4.png', link: '/security'},
       {name: 'Rector', icon: 'chatIcons/img.png', link: '/rector'},
       {name: 'Misconducts', icon: 'chatIcons/settings/SecureMajor.svg', link: '/misconducts'},
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


  protected readonly textColor = textColor;
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
  avatarColor: string = '';
  textColors: string = '';

  ngOnInit() {

    const colors = [
      '#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D',
      '#FF9F1C', '#9B5DE5', '#00BBF9', '#F15BB5'
    ];

    // Pick a random color
    this.avatarColor = colors[Math.floor(Math.random() * colors.length)];
    this.textColors = this.getContrastColor(this.avatarColor);

    this.student = this.studentContext.student;
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
  getContrastColor(hexColor: string): string {
    // Remove '#' if present
    hexColor = hexColor.replace('#', '');

    // Convert to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Calculate brightness (YIQ formula)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Return dark text for light backgrounds, light text for dark backgrounds
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  }
}
