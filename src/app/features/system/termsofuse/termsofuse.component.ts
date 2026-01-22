import { Component } from '@angular/core';

@Component({
  selector: 'app-termsofuse',
  standalone: true,
  imports: [],
  templateUrl: './termsofuse.component.html',
  styleUrl: './termsofuse.component.scss'
})
export class TermsofuseComponent {
  activeSection: string = 'privacy-policy';

  sections = [
    { id: 'privacy-policy', title: 'Privacy Policy', icon: 'bi-shield-lock' },
    { id: 'terms-of-use', title: 'Terms of Use', icon: 'bi-file-text' },
    { id: 'cookie-policy', title: 'Cookie Policy', icon: 'bi-cookie' },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: 'bi-c-circle' },
    { id: 'contact-info', title: 'Contact Information', icon: 'bi-envelope' }
  ];

  lastUpdated: string = 'January 14, 2026';
  companyName: string = 'Salson Designers';
  companyEmail: string = 'salsondesigners.ng@gmail.com';
  companyAddress: string = 'No. 42 Sharada Small Scale Industry, Kano KMC, Kano State, Nigeria';
  companyPhone: string = '+234 802 857 3756';

  ngOnInit(): void {
    // Set active section based on URL fragment if provided
    const hash = window.location.hash.substring(1);
    if (hash && this.sections.some(s => s.id === hash)) {
      this.activeSection = hash;
    }
  }

  setActiveSection(sectionId: string): void {
    this.activeSection = sectionId;
    // Update URL fragment without page reload
    window.history.replaceState(null, '', `#${sectionId}`);
    // Scroll to top of section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
