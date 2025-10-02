import { Component } from '@angular/core';

@Component({
  selector: 'app-rules',
  imports: [],
  templateUrl: './rules.html',
  styleUrl: './rules.css'
})
export class Rules {
  RULES_AND_REGULATIONS: string[] = [
    // Eligibility & Registration
    "All applicants must register with valid personal information before applying for a loan.",
    "Applicants must provide government-issued identification for verification purposes.",
    "A borrower must have a verifiable source of income to qualify for a loan.",
    "Multiple accounts created by the same person are strictly prohibited.",
    "Only one active loan per borrower is allowed unless otherwise approved by the lender.",

    // Loan Application & Approval
    "Loan applications must be submitted through the official loan system platform only.",
    "Incomplete or inaccurate applications will be rejected automatically.",
    "Approval of a loan is at the sole discretion of the lender.",
    "The lender reserves the right to request additional documents before approving a loan.",
    "Any misrepresentation of information may result in immediate disqualification and legal action.",

    // Repayment & Interest
    "Borrowers must repay loans according to the agreed repayment schedule.",
    "Interest rates and repayment terms will not be altered once a loan agreement is signed.",
    "Late payments will attract penalties and may affect future loan eligibility.",
    "Borrowers are encouraged to make early repayments to improve their credit history.",
    "Failure to repay may result in blacklisting, legal recovery processes, or seizure of collateral.",

    // Conduct & Use of Platform
    "Borrowers must maintain respectful communication with staff and support representatives.",
    "The loan system must not be used for fraudulent or unlawful purposes.",
    "Sharing of account credentials with third parties is strictly prohibited.",
    "All activities within the platform are subject to monitoring for compliance and fraud prevention.",
    "Misuse of the loan system may result in permanent suspension of access.",

    // Privacy & Data
    "All borrower information will be handled in compliance with data protection regulations.",
    "The borrower agrees to allow the lender to verify information with third-party institutions.",
    "The lender may share borrower data with credit bureaus in case of default.",
    "Borrowers are responsible for keeping their contact and banking details updated.",
    "System rules and regulations are subject to periodic updates, and users will be notified of major changes."
  ];
}
