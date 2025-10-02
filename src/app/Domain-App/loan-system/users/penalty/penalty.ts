import { Component } from '@angular/core';

@Component({
  selector: 'app-penalty',
  imports: [],
  templateUrl: './penalty.html',
  styleUrl: './penalty.css'
})
export class Penalty {
  PENALTIES: { violation: string; consequence: string }[] = [
    {
      violation: "1. Late Repayment & Loan Default",
      consequence: "Borrowers who fail to make their repayments on the agreed dates will incur progressive penalties. A repayment delayed by 1–7 days will attract a penalty fee of 2% of the outstanding balance, serving as a reminder of the importance of punctuality. Repayments delayed between 8–30 days will attract a higher penalty of 5% of the outstanding balance, and the borrower will automatically lose eligibility for new loan applications until their account is settled. Defaults extending beyond 30 days will result in more severe measures, including the reporting of the borrower’s record to credit bureaus, initiation of legal recovery proceedings, and additional administrative fees. In cases where the default extends beyond 90 days, the borrower’s loan account will be permanently terminated. If collateral was provided, it will be seized and liquidated by the lender to recover the debt. At this stage, the borrower will also be permanently blacklisted from accessing loans within the institution and possibly across partnered financial institutions. The purpose of these penalties is to ensure accountability and discourage negligence in repayment behavior."
    },
    {
      violation: "2. Fraud, False Information & Forged Documents",
      consequence: "Borrowers are strictly prohibited from providing false income statements, falsifying employment details, overstating financial capacity, or submitting forged documentation during the loan application process. Engaging in such practices not only undermines the credibility of the financial system but also creates unnecessary risks for the lender. Any instance of fraud or misrepresentation will lead to the immediate termination of the loan and permanent suspension of the borrower’s account from the lending platform. Additionally, such cases will be reported to law enforcement authorities for prosecution, potentially leading to criminal charges, fines, or imprisonment depending on the severity of the offense. In cases where the fraud has caused financial loss to the lender, recovery actions and compensation claims will also be pursued legally. Borrowers should understand that fraud is a zero-tolerance offense that carries long-lasting consequences beyond the institution."
    },
    {
      violation: "3. Misuse of Loan Funds & System Abuse",
      consequence: "Loans are granted strictly for the purposes stated and approved in the loan application. Borrowers found to be diverting loan funds into illegal, fraudulent, or non-approved activities will face immediate loan termination, with the outstanding balance becoming due in full. Such misuse automatically results in blacklisting from the lending system and a permanent ban from reapplying for future loans. Furthermore, attempts to tamper with the loan management system, exploit software vulnerabilities, or engage in account misuse will be treated as cybercrime. Offenders will have their accounts suspended immediately and may face prosecution under relevant cybercrime laws. These penalties exist to protect the integrity of the loan system, ensure responsible use of funds, and safeguard all stakeholders against financial crimes."
    },
    {
      violation: "4. Documentation, Insurance & Collateral Violations",
      consequence: "To maintain transparency and security in loan processing, borrowers are required to provide valid and accurate documentation, including identity verification, proof of residence, and up-to-date bank details. Failure to provide or update this information when requested will result in suspension of the loan application or account until compliance is achieved. For secured loans, borrowers must also maintain their collateral in a valid, legal, and transferable state. Negligence in maintaining collateral—such as losing legal rights to it or failing to insure it—will trigger immediate loan recall, meaning the borrower will be required to repay the loan in full or risk repossession. Where insurance is a mandatory condition, borrowers must pay the agreed insurance premiums promptly. Non-payment of insurance fees voids any cover provided, leaving the borrower fully liable for risks associated with the loan. These rules ensure that loans remain legally enforceable, protect both borrower and lender, and maintain compliance with financial regulations."
    },
    {
      violation: "5. Repayment Agreement & Grace Period Abuse",
      consequence: "Borrowers are expected to honor the repayment agreements exactly as stated in their loan contracts. Any breach of the repayment terms attracts a fixed penalty of ₦5,000 / $20, alongside a reduction in the borrower’s credit score, which could affect future borrowing opportunities. While grace periods or extensions may be provided at the lender’s discretion, repeated abuse of such leniency—such as frequently requesting extensions without genuine cause—will result in higher interest rates on the current loan (an increase of 2%) and denial of future loan applications. Early loan termination without proper notice or approval will also attract a penalty fee of 3% of the outstanding balance, to cover administrative and financial disruptions caused to the lender. These measures encourage borrowers to respect contractual obligations and discourage a culture of laxity in loan repayment."
    },
    {
      violation: "6. Repeat Offenses & Blacklisting",
      consequence: "Borrowers who repeatedly violate loan policies face escalating consequences. Multiple missed repayments within a single year may result in temporary restrictions, such as a 12-month ban on accessing new loans. Repeated defaults (more than two within a given period) will lead to permanent blacklisting, meaning the borrower’s details will be reported not only within the lender’s system but also to partner financial institutions and credit bureaus, severely limiting future borrowing opportunities. Additionally, misconduct such as unauthorized sharing of account credentials, lending account access to third parties, or attempting to bypass security checks will trigger a 30-day suspension on the first offense. Repeat violations of this kind will result in a permanent ban from the platform. These measures are in place to maintain discipline, protect the lender’s reputation, and ensure that only responsible borrowers can benefit from loan services."
    }
  ];

}
