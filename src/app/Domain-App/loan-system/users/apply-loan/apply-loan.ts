import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-apply-loan',
  imports: [
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    DecimalPipe
  ],
  templateUrl: './apply-loan.html',
  styleUrl: './apply-loan.css'
})
export class ApplyLoan {
  loanForm: FormGroup;
  collaterals: FormArray;

  constructor(private fb: FormBuilder) {
    this.collaterals = this.fb.array([]);

    this.loanForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1000)]],
      purpose: ['', Validators.required],
      term: ['', [Validators.required, Validators.min(1)]],
      interestRate: ['', [Validators.required, Validators.min(1)]],
      repaymentMethod: ['', Validators.required],
      collateral: [''],
      employmentStatus: ['', Validators.required],
      income: ['', [Validators.required, Validators.min(0)]],
      debts: [''],
      startDate: ['', Validators.required],
      notes: [''],

      // assessment fields
      creditScore: [''],
      requestedAmount: ['']
    });
  }

  // Debt-to-income ratio
  dti(): number {
    const income = Number(this.loanForm.get('income')?.value) || 0;
    const debts = Number(this.loanForm.get('debts')?.value) || 0;
    const newRep = this.estimatedMonthlyRepayment();
    if (income === 0) return 0;
    return ((debts + newRep) / income) * 100; // percentage
  }

  isSecured(): boolean {
    return this.collaterals.length > 0;
  }

  estimatedMonthlyRepayment(): number {
    const P = Number(this.loanForm.get('requestedAmount')?.value) || 0;
    const rAnnual = Number(this.loanForm.get('interestRate')?.value) || 0;
    const nMonths = Number(this.loanForm.get('term')?.value) || 1;

    const r = rAnnual / 100 / 12;
    if (r === 0) return P / nMonths;

    const numerator = P * r * Math.pow(1 + r, nMonths);
    const denominator = Math.pow(1 + r, nMonths) - 1;
    return denominator === 0 ? P / nMonths : numerator / denominator;
  }

  get suggestedApproval(): boolean {
    const creditScore = Number(this.loanForm.get('creditScore')?.value) || 0;
    const dti = this.dti();
    const requested = Number(this.loanForm.get('requestedAmount')?.value) || 0;

    let collateralCoverage = 0;
    if (this.isSecured()) {
      const total = this.collaterals.controls.reduce(
        (s, g) => s + (Number(g.get('value')?.value) || 0),
        0
      );
      collateralCoverage = requested === 0 ? 0 : (total / requested) * 100;
    }

    if (requested <= 0) return false;
    if (this.isSecured() && collateralCoverage >= 100) return true;
    if (creditScore >= 650 && dti <= 40) return true;
    if (creditScore >= 600 && dti <= 35) return true;
    return false;
  }

  get suggestionReason(): string {
    const reasons: string[] = [];
    const creditScore = Number(this.loanForm.get('creditScore')?.value);
    const dtiVal = this.dti();

    if (!this.loanForm.valid) reasons.push('Form not valid');

    if (creditScore) {
      if (creditScore < 600) reasons.push('Low credit score');
      else reasons.push('Credit score acceptable');
    } else {
      reasons.push('No credit score provided');
    }

    if (dtiVal > 50) reasons.push('High DTI');
    else reasons.push('DTI within limits');

    if (this.isSecured()) {
      const requested = Number(this.loanForm.get('requestedAmount')?.value) || 0;
      const totalCollateral = this.collaterals.controls.reduce(
        (s, g) => s + (Number(g.get('value')?.value) || 0),
        0
      );
      if (totalCollateral < requested) reasons.push('Collateral coverage low');
      else reasons.push('Collateral sufficient');
    }

    return reasons.join(' • ');
  }

  onSubmit() {
    if (this.loanForm.invalid) {
      console.warn('Loan application form is invalid', this.loanForm.value);
      return;
    }

    const payload = this.loanForm.value;
    const assessment = {
      dtiPercent: this.dti(),
      estimatedMonthlyRepayment: this.estimatedMonthlyRepayment(),
      suggestedApproval: this.suggestedApproval,
      suggestionReason: this.suggestionReason
    };

    console.log('Loan application payload:', payload);
    console.log('Computed assessment:', assessment);
  }

}
