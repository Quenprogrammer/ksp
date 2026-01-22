import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  lastUpdated = new Date('2026-01-01');

  privacySections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: 'Harrkman Integrated Farms Ltd ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, use our services, or interact with us in relation to our agricultural products and services.',
      icon: 'bi-shield-check'
    },
    {
      id: 'information-collection',
      title: '2. Information We Collect',
      content: 'We collect information you provide directly (name, email, phone, address), information automatically collected (IP address, browser type, device information), and information from third parties (business partners, service providers). For farmers and business partners, we may collect additional agricultural and business information.',
      icon: 'bi-database'
    },
    {
      id: 'how-we-use',
      title: '3. How We Use Your Information',
      content: 'We use your information to: Provide agricultural services, process transactions, communicate about products, improve our services, comply with legal obligations, protect our rights, and send marketing communications (with consent). For farmers, we use data to provide agronomic support and market access.',
      icon: 'bi-gear'
    },
    {
      id: 'information-sharing',
      title: '4. Information Sharing and Disclosure',
      content: 'We may share information with: Service providers assisting our operations, business partners for agricultural collaborations, legal authorities when required by law, and successors in business transactions. We do not sell personal information to third parties for marketing purposes.',
      icon: 'bi-share'
    },
    {
      id: 'data-security',
      title: '5. Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information. This includes encryption, access controls, secure servers, and regular security assessments. However, no internet transmission is 100% secure.',
      icon: 'bi-lock'
    },
    {
      id: 'data-retention',
      title: '6. Data Retention',
      content: 'We retain personal information only as long as necessary for the purposes outlined in this policy, or as required by Nigerian law. Agricultural transaction records are kept for 7 years as per regulatory requirements. You may request deletion of your data subject to legal obligations.',
      icon: 'bi-clock-history'
    },
    {
      id: 'your-rights',
      title: '7. Your Rights',
      content: 'You have rights to: Access your personal information, correct inaccurate data, request deletion (where applicable), object to processing, request data portability, and withdraw consent for marketing. Contact us to exercise these rights.',
      icon: 'bi-person-check'
    },
    {
      id: 'cookies-tracking',
      title: '8. Cookies and Tracking Technologies',
      content: 'We use cookies and similar technologies to enhance user experience, analyze website traffic, and personalize content. You can control cookies through your browser settings. Essential cookies are required for website functionality.',
      icon: 'bi-cookie'
    },
    {
      id: 'third-party-links',
      title: '9. Third-Party Websites',
      content: 'Our website may contain links to third-party sites (agricultural suppliers, government agencies). We are not responsible for the privacy practices of these sites. Review their privacy policies before providing personal information.',
      icon: 'bi-link-45deg'
    },
    {
      id: 'children-privacy',
      title: '10. Children\'s Privacy',
      content: 'Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete it.',
      icon: 'bi-people'
    },
    {
      id: 'international-transfers',
      title: '11. International Data Transfers',
      content: 'As an agricultural business in Nigeria, we primarily process data within Nigeria. For international collaborations, we ensure appropriate safeguards are in place to protect your information during cross-border transfers.',
      icon: 'bi-globe'
    },
    {
      id: 'changes-policy',
      title: '12. Changes to This Policy',
      content: 'We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website with an updated effective date. Your continued use constitutes acceptance.',
      icon: 'bi-arrow-clockwise'
    },
    {
      id: 'contact-us',
      title: '13. Contact Us',
      content: 'For privacy-related questions or to exercise your rights, contact: Data Protection Officer, Harrkman Integrated Farms Ltd, [Address], Nigeria. Email: privacy@harrkmanfarms.com, Phone: [+234 XXX XXX XXXX].',
      icon: 'bi-envelope'
    }
  ];

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
