import {Component, ElementRef, HostListener, signal, ViewChild, WritableSignal} from '@angular/core';

import {RouterLink} from '@angular/router';
import {textColor} from '../../data/config';
import {Modal} from '../../shared/modal';
import {ChatHeader} from './chat-header/chat-header';
import {Others} from './others/others';
import {Device} from './device/device';
import {NgForOf, NgIf} from '@angular/common';
import {NetworkService} from '../../services/network.service';
import {Request} from './request/request';
import {Network} from './component/network/network';
import {ChatUserSettings} from './chat-user-settings/chat-user-settings';

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
    ChatUserSettings
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat {
  // Main dropdowns
  isAppsOpen = signal(false);
  requestModal = signal(false);

  isAccountOpen = signal(false);

  // Submenus inside Account dropdown
  isStatusOpen = signal(false);
  isCustomizationOpen = signal(false);

  @ViewChild('appsMenu') appsMenuRef!: ElementRef;
  @ViewChild('appsBtn') appsBtnRef!: ElementRef;
  @ViewChild('accountMenu') accountMenuRef!: ElementRef;
  @ViewChild('accountBtn') accountBtnRef!: ElementRef;



  constructor(private networkService: NetworkService) {

  }




  toggleApps() {
    this.isAppsOpen.update(v => !v);
    this.isAccountOpen.set(false); // close other menu
  }

  toggleAccount() {
    this.isAccountOpen.update(v => !v);
    this.isAppsOpen.set(false); // close other menu
  }

  toggleStatus() {
    this.isStatusOpen.update(v => !v);
    this.isCustomizationOpen.set(false);
  }

  toggleCustomization() {
    this.isCustomizationOpen.update(v => !v);
    this.isStatusOpen.set(false);
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



    {name: 'Lecturers', icon: 'chatIcons/contact.svg', link: '/lecturers'},
      {name: 'Departments', icon: 'chatIcons/registration.svg', link: '/departments'},

    {name: 'Administrators', icon: 'chatIcons/admin.svg', link: '/administrators'},
       {name: 'Request', icon: 'chatIcons/library.svg', link: '/request'},
       {name: 'Student affairs', icon: 'chatIcons/library.svg', link: '/student-affairs'},
       {name: 'Security', icon: 'chatIcons/library.svg', link: '/security'},
       {name: 'Rector', icon: 'chatIcons/img.png', link: '/rector'},
       {name: 'Misconducts', icon: 'chatIcons/library.svg', link: '/misconducts'},

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
}
