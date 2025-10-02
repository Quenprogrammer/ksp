import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  imports: [],
  templateUrl: './terms-and-conditions.html',
  styleUrl: './terms-and-conditions.css'
})
export class TermsAndConditions {
  TERMS_AND_CONDITIONS = [
    {
      title: "1. Eligibility & Verification",
      content: "Applicants must be at least 18 years of age and legally capable of entering into a binding contract. The borrower must provide accurate and verifiable personal, financial, and identification details during the loan application process. The lender reserves the right to conduct background checks, verify the authenticity of submitted documents, assess credit history, and evaluate the applicant’s ability to repay the loan. If collateral is required, it must be legally transferable and free from disputes or encumbrances. Submission of false, incomplete, or misleading information will result in automatic disqualification, legal liability, and may permanently affect the borrower’s eligibility for future loans."
    },
    {
      title: "2. Loan Terms & Agreement",
      content: "All loans are governed strictly by the formal loan agreement signed between the lender and the borrower. The agreement will clearly state the approved loan amount, applicable interest rate, repayment schedule, tenure, and any additional fees or charges. Interest is calculated based on the outstanding balance in accordance with the terms specified in the agreement. Any applicable loan processing fees, administrative charges, or insurance premiums are non-refundable and deducted upfront or disclosed prior to disbursement. The borrower is encouraged to review the agreement carefully, seek clarification where necessary, and accept responsibility for complying with every clause of the contract once signed."
    },
    {
      title: "3. Repayment Obligations",
      content: "The borrower must make repayments in line with the agreed repayment schedule stated in the loan contract. Repayments should be made in full on or before the due date through approved payment channels. Failure to make repayments as scheduled may attract late payment penalties, additional interest charges, or other enforcement actions as determined by the lender. Consistent non-compliance or repeated defaults may lead to termination of the loan agreement, reporting of the borrower to relevant credit bureaus, blacklisting from future loan applications, and possible legal recovery proceedings. The borrower acknowledges responsibility for ensuring that their payment details (such as bank account information) are accurate to avoid delays or misapplication of payments."
    },
    {
      title: "4. Collateral & Default",
      content: "For loans requiring collateral, the borrower must ensure that the collateral is legally owned, properly documented, and transferable to the lender in the event of default. The lender holds the right to repossess, claim, or liquidate the collateral if the borrower fails to meet repayment obligations. If the borrower engages in willful default, fraud, or any act intended to deceive or obstruct repayment, the lender may pursue civil or criminal action under applicable financial laws. Collateral repossession will be carried out in compliance with relevant legal and regulatory frameworks to protect both parties. Once repossessed, the collateral may be sold or transferred to recover the outstanding loan balance, with any surplus (if applicable) returned to the borrower."
    },
    {
      title: "5. Data Use & Communication",
      content: "By submitting a loan application, the borrower grants consent for the lender to collect, store, and process personal and financial data. This information is used strictly for loan assessment, disbursement, repayment monitoring, regulatory compliance, and customer communication. The lender guarantees that such data will be handled securely in line with data protection and privacy regulations. Borrowers may be contacted via SMS, email, phone calls, or in-app notifications regarding loan status, repayment reminders, policy changes, or other essential communications. The lender is not responsible for losses or delays caused by inaccurate borrower information, technical disruptions, or factors beyond its control. By continuing with the loan application, the borrower acknowledges and accepts these data-use provisions."
    },
    {
      title: "6. Modifications, Early Repayment & Dispute Resolution",
      content: "Borrowers have the right to make early repayments in full or partial amounts, subject to the conditions outlined in the loan agreement. In such cases, the borrower may request an updated statement reflecting outstanding balances and applicable adjustments. The lender reserves the right to revise loan conditions, including interest rates, fees, or repayment schedules, to align with changes in financial regulations, market conditions, or internal policies. Borrowers will be notified of such modifications through official communication channels. In the event of disputes arising from the loan relationship, both parties agree to first seek resolution through negotiation or mediation before escalating to legal proceedings. All legal disputes shall be governed by the financial laws and jurisdiction of the lender’s registered country. By submitting a loan application, the borrower confirms that they have read, understood, and agreed to these binding terms and conditions."
    }
  ];
}
