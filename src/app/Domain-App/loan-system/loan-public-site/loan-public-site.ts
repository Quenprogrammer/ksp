import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {TestimonialsComponent} from './testimonials/testimonials.component';

import {LoanHomeHero} from './loan-home-hero/loan-home-hero';
import {StatisticsComponent} from './statistics/statistics.component';
import {HowItWorks} from './how-it-works/how-it-works';
import {FaqComponent} from './faq/faq.component';

@Component({
  selector: 'app-loan-public-site',
  imports: [
    NgForOf,
    NgClass,
    TestimonialsComponent,

    LoanHomeHero,
    StatisticsComponent,
    HowItWorks,
    FaqComponent
  ],
  templateUrl: './loan-public-site.html',
  styleUrl: './loan-public-site.css'
})
export class LoanPublicSite {
// ---------------------- COMPANY VALUES ---------------------- //

 mission: string[] = [
    "Our mission is to provide accessible, transparent, and affordable loan services to individuals, students, farmers, and businesses.",
    "We aim to simplify the borrowing process by leveraging technology to reduce paperwork, cut waiting time, and make funds available faster.",
    "By ensuring flexible repayment terms and customer-friendly interest rates, we empower people to achieve their personal and professional goals without financial strain."
  ];

 vision: string[] = [
    "Our vision is to become the most trusted and innovative loan service provider in Africa, offering financial inclusion to both urban and rural populations.",
    "We strive to create a future where every eligible individual or business can access quick and reliable credit without unnecessary barriers.",
    "Through digital transformation, we envision a financial ecosystem that empowers customers to manage loans entirely online with maximum security and convenience."
  ];

 scope: string[] = [
    "The scope of our loan system covers a wide range of financial products including personal loans, business loans, education loans, agricultural loans.",
    "Our services extend beyond simple loan disbursement – we also provide repayment tracking, overdue monitoring, automated reminders, and financial reporting.",
    "The system is designed for both customers and administrators, ensuring smooth loan applications, approvals, disbursements, and repayments. "
  ];

 target: string[] = [
    "Our primary target audience includes individuals seeking personal or emergency loans for short-term needs.",
    "We also target small and medium enterprises (SMEs) that require funding for growth, expansion, or working capital.",
    "Students and parents are an important demographic, as education financing continues to grow in demand.",
    "Additionally, farmers and agribusiness owners benefit from tailored agricultural loans that align with seasonal cycles.",
    "Overall, our goal is to serve anyone who needs transparent, reliable, and affordable credit solutions."
  ];
  loanProducts: string[] = [
    "Personal Loan – Quick funds for emergencies, bills, and personal expenses with flexible repayment.",
    "Business Loan – Finance your small or large-scale business expansion, equipment, or operations.",
    "Education Loan – Affordable loans to pay tuition, books, and study abroad programs.",
    "Mortgage Loan – Housing loans with low interest rates and long repayment terms.",
    "Vehicle Loan – Get your dream car with structured and easy repayments.",
    "Agricultural Loan – Loans to support farmers and agribusiness projects."
  ];

  howItWorks: string[] = [
    "Step 1: Apply Online – Customers fill a simple application form with basic details including full name, income, and loan purpose.",
    "Step 2: Upload Documents – Required documents such as proof of ID, proof of address, and income statement are uploaded for verification.",
    "Step 3: Get Approved – Once documents are reviewed, the system automatically approves eligible applications within 24 hours.",
    "Step 4: Receive Funds – Approved funds are transferred directly to the applicant’s bank account without delay."

  ];
  whyChooseUs: { header: string; description: string }[] = [
    {
      header: "Fast Approval",
      description: "Get approved within 24 hours with minimal hassle."
    },
    {
      header: "Affordable Rates",
      description: "Low & flexible interest rates tailored to your needs."
    },
    {
      header: "Transparent Pricing",
      description: "No hidden charges — our process is fully transparent."
    },
    {
      header: "24/7 Support",
      description: "Online customer support available round the clock."
    }
  ];





phone='Phone – Call our customer care team at +234-800-123-4567 for immediate assistance.'
email='Email – Reach out to us at support@loanpro.com for inquiries or technical issues.'
chat='Live Chat – A 24/7 chat widget is available on our website to answer quick questions in real time.'
location='Branch Locator – Customers can use the map to find the nearest physical branch for in-person consultation.'
 contactInfo: string[] = [
    "Phone – Call our customer care team at +234-800-123-4567 for immediate assistance.",
    "Email – Reach out to us at support@loanpro.com for inquiries or technical issues.",
    "Live Chat – A 24/7 chat widget is available on our website to answer quick questions in real time.",
    "Branch Locator – Customers can use the map to find the nearest physical branch for in-person consultation."
  ];
address='Danladi Nasidi'
state='Kano State'
  protected readonly onpageshow = onpageshow;
}
