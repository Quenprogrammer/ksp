import { Component } from '@angular/core';

@Component({
  selector: 'app-policy',
  imports: [],
  templateUrl: './policy.html',
  styleUrl: './policy.css'
})
export class Policy {
  LOAN_POLICIES: { title: string; description: string }[] = [
    {
      title: "1. Eligibility & Application Policy",
      description: "Borrowers must be at least 18 years old, legally capable of entering into binding agreements, and in possession of a valid form of identification such as a national ID, driver’s license, or passport. Eligibility also requires the borrower to meet minimum income thresholds and creditworthiness standards as defined by the lender. Loan applications must be filled truthfully and supported with accurate documentation, including proof of income, employment status, and residential address. Incomplete or misleading applications will result in disqualification, and deliberate falsification of records will be treated as fraud with possible legal consequences. The lender reserves the right to request additional documents and to verify all submitted information before approval is considered."
    },
    {
      title: "2. Loan Approval & Disbursement Policy",
      description: "Approval of loan applications is based on strict verification of details provided by the borrower, including identity checks, income verification, and credit assessments. Approval is not automatic and may be declined if the borrower fails to meet the internal risk assessment standards. Once approved, funds will be disbursed directly into the borrower’s verified bank account within one to three business days. The borrower bears the responsibility of ensuring the accuracy of their banking details to prevent failed or delayed disbursements. Disbursements are final and cannot be reversed once processed."
    },
    {
      title: "3. Repayment & Interest Policy",
      description: "Borrowers are required to repay loans strictly in line with the agreed repayment schedule, which may be structured weekly, bi-weekly, or monthly, depending on the loan type. Repayments must be made in full through approved channels and on or before the due dates. Late or missed repayments may attract penalties, additional charges, or higher interest rates, all of which will be clearly outlined in the loan agreement. Interest rates are determined based on the type of loan, the repayment tenure, and the borrower’s assessed risk profile. Rates are disclosed upfront before acceptance of the loan, and once agreed upon, they form a binding part of the loan contract."
    },
    {
      title: "4. Grace Period, Extension & Restructuring Policy",
      description: "At the lender’s discretion, a grace period may be granted to borrowers experiencing short-term financial challenges. During this period, repayments may be temporarily deferred, but interest continues to accrue unless explicitly waived. Borrowers may also request loan extensions or restructuring before the due date if they anticipate repayment difficulties. Restructuring could involve extending the repayment tenure, adjusting installment amounts, or modifying the repayment schedule. Such requests are reviewed on a case-by-case basis and are subject to the lender’s approval. Additional administrative fees or revised interest rates may apply to restructured loans."
    },
    {
      title: "5. Collateral, Insurance & Default Policy",
      description: "For secured loans, borrowers must provide collateral that is legally owned, verifiable, and free from encumbrances. Examples of acceptable collateral include land, vehicles, or other valuable assets. In the event of default, the lender reserves the right to repossess or liquidate the collateral in line with legal and regulatory provisions. Certain loans may also require mandatory insurance coverage as a safeguard against risks such as illness, disability, or death. Failure to pay insurance premiums or maintain coverage may void the borrower’s protection. Borrowers who default on repayments face severe consequences including penalty charges, blacklisting from future borrowing, debt recovery actions, and possible legal proceedings."
    },
    {
      title: "6. Data Privacy, Fraud Prevention & Customer Support Policy",
      description: "The lender is committed to protecting borrower information in compliance with applicable data protection laws. All personal and financial data collected will be used strictly for loan assessment, disbursement, monitoring, and regulatory reporting. Data will not be shared with unauthorized third parties without the borrower’s consent, except where required by law. Fraudulent activities such as document falsification, misrepresentation of income, or misuse of loan funds will result in immediate loan termination and may be reported to law enforcement authorities. Borrowers have the right to access customer support channels for inquiries, clarifications, complaints, or assistance throughout the loan lifecycle. The lender ensures that support is provided promptly, transparently, and professionally."
    }
  ];
}
