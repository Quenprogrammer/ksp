import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe, JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import {HeaderPoly} from '../../../chat/request/header-poly/header-poly';
import {Firestore, collection, addDoc, setDoc, updateDoc, getDoc, doc} from '@angular/fire/firestore';
@Component({
  selector: 'app-apply-loan',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    DecimalPipe,
    NgClass,
    JsonPipe,
    HeaderPoly
  ],
  template: `
<div class="container mt-4">
  <app-header-poly [title]="'Loan Application'"></app-header-poly>


  <!-- Stepper / Wizard header -->
  <ul class="nav nav-pills mb-3 content-space-3">
    <li class="nav-item" *ngFor="let s of steps; let i = index">
      <a class="nav-link" [class.active]="i === step" (click)="goToStep(i)">{{ i+1 }}. {{ s }}</a>
    </li>
  </ul>

  <form [formGroup]="loanForm" (ngSubmit)="onSubmit()" novalidate>

    <!-- STEP 1: Applicant Info -->
    <section *ngIf="step === 0">
      <h5>Applicant Information</h5>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Full name</label>
          <input class="form-control" formControlName="fullName" placeholder="e.g. Musa Adamu"
                 [class.is-invalid]="fullName.invalid && (fullName.dirty || fullName.touched)" />
          <div class="invalid-feedback" *ngIf="fullName.errors?.['required'] && (fullName.dirty || fullName.touched)">
            Full name is required
          </div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input class="form-control" formControlName="email" type="email"
                 [class.is-invalid]="email.invalid && (email.dirty || email.touched)" />
          <div class="invalid-feedback" *ngIf="email.errors?.['required'] && (email.dirty || email.touched)">
            Email is required
          </div>
          <div class="invalid-feedback" *ngIf="email.errors?.['email'] && (email.dirty || email.touched)">
            Please enter a valid email address
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label">Phone</label>
          <input class="form-control" formControlName="phone"
                 [class.is-invalid]="phone.invalid && (phone.dirty || phone.touched)" />
          <div class="invalid-feedback" *ngIf="phone.errors?.['required'] && (phone.dirty || phone.touched)">
            Phone number is required
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label">Date of birth</label>
          <input class="form-control" formControlName="dob" type="date"
                 [class.is-invalid]="dob.invalid && (dob.dirty || dob.touched)" />
          <div class="invalid-feedback" *ngIf="dob.errors?.['required'] && (dob.dirty || dob.touched)">
            Date of birth is required
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label">BVN / National ID</label>
          <input class="form-control" formControlName="bvn" />
        </div>

        <div class="col-md-12">
          <label class="form-label">Residential address</label>
          <input class="form-control" formControlName="address" />
        </div>
      </div>
    </section>

    <!-- STEP 2: Employment / Business -->
    <section *ngIf="step === 1">
      <h5>Employment / Business Details</h5>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Employment status</label>
          <select class="form-select" formControlName="employmentStatus"
                  [class.is-invalid]="employmentStatus.invalid && (employmentStatus.dirty || employmentStatus.touched)">
            <option value="">Select...</option>
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
          </select>
          <div class="invalid-feedback" *ngIf="employmentStatus.errors?.['required'] && (employmentStatus.dirty || employmentStatus.touched)">
            Employment status is required
          </div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Employer / Business Name</label>
          <input class="form-control" formControlName="employer" />
        </div>
        <div class="col-md-4">
          <label class="form-label">Position / Role</label>
          <input class="form-control" formControlName="position" />
        </div>
        <div class="col-md-4">
          <label class="form-label">Monthly income (NGN)</label>
          <input class="form-control" type="number" formControlName="income"
                 [class.is-invalid]="income.invalid && (income.dirty || income.touched)" />
          <div class="invalid-feedback" *ngIf="income.errors?.['required'] && (income.dirty || income.touched)">
            Monthly income is required
          </div>
          <div class="invalid-feedback" *ngIf="income.errors?.['min'] && (income.dirty || income.touched)">
            Monthly income must be positive
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label">Existing debts (NGN)</label>
          <input class="form-control" type="number" formControlName="debts" />
        </div>

        <div class="col-md-12">
          <label class="form-label">Business type (if applicable)</label>
          <input class="form-control" formControlName="businessType" />
        </div>
      </div>
    </section>

    <!-- STEP 3: Loan Details -->
    <section *ngIf="step === 2">
      <h5>Loan Details</h5>
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label">Loan type</label>
          <select class="form-select" formControlName="loanType"
                  [class.is-invalid]="loanType.invalid && (loanType.dirty || loanType.touched)">
            <option value="">Select...</option>
            <option>Personal</option>
            <option>Business</option>
            <option>Education</option>
            <option>Mortgage</option>
            <option>Car</option>
            <option>Emergency</option>
          </select>
          <div class="invalid-feedback" *ngIf="loanType.errors?.['required'] && (loanType.dirty || loanType.touched)">
            Loan type is required
          </div>
        </div>

        <div class="col-md-4">
          <label class="form-label">Amount requested (NGN)</label>
          <input class="form-control" type="number" formControlName="amount"
                 [class.is-invalid]="amount.invalid && (amount.dirty || amount.touched)" />
          <div class="invalid-feedback" *ngIf="amount.errors?.['required'] && (amount.dirty || amount.touched)">
            Loan amount is required
          </div>
          <div class="invalid-feedback" *ngIf="amount.errors?.['min'] && (amount.dirty || amount.touched)">
            Minimum loan amount is ₦1,000
          </div>
        </div>

        <div class="col-md-4">
          <label class="form-label">Term (months)</label>
          <input class="form-control" type="number" formControlName="term"
                 [class.is-invalid]="term.invalid && (term.dirty || term.touched)" />
          <div class="invalid-feedback" *ngIf="term.errors?.['required'] && (term.dirty || term.touched)">
            Loan term is required
          </div>
          <div class="invalid-feedback" *ngIf="term.errors?.['min'] && (term.dirty || term.touched)">
            Loan term must be at least 1 month
          </div>
        </div>

        <div class="col-md-4">
          <label class="form-label">Interest rate (annual %)</label>
          <input class="form-control" type="number" formControlName="interestRate"
                 [class.is-invalid]="interestRate.invalid && (interestRate.dirty || interestRate.touched)" />
          <div class="invalid-feedback" *ngIf="interestRate.errors?.['required'] && (interestRate.dirty || interestRate.touched)">
            Interest rate is required
          </div>
          <div class="invalid-feedback" *ngIf="interestRate.errors?.['min'] && (interestRate.dirty || interestRate.touched)">
            Interest rate cannot be negative
          </div>
        </div>

        <div class="col-md-4">
          <label class="form-label">Grace period (months)</label>
          <input class="form-control" type="number" formControlName="gracePeriod" />
        </div>

        <div class="col-md-4">
          <label class="form-label">Insurance required?</label>
          <select class="form-select" formControlName="insuranceIncluded">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div class="col-md-12">
          <label class="form-label">Purpose / Notes</label>
          <textarea class="form-control" formControlName="purpose"></textarea>
        </div>
      </div>
    </section>

    <!-- STEP 4: Collateral & Co-signer -->
    <section *ngIf="step === 3">
      <h5>Collateral (if secured) & Co-signer</h5>

      <div class="mb-3 border rounded p-3">
        <div formArrayName="collaterals">
          <div *ngFor="let c of collaterals.controls; let i = index" [formGroupName]="i" class="mb-3 border-bottom pb-3">
            <div class="row g-2 align-items-end">
              <div class="col-md-3">
                <label class="form-label">Type</label>
                <input class="form-control" formControlName="type"
                       [class.is-invalid]="c.get('type')?.invalid && (c.get('type')?.dirty || c.get('type')?.touched)" />
                <div class="invalid-feedback" *ngIf="c.get('type')?.errors?.['required'] && (c.get('type')?.dirty || c.get('type')?.touched)">
                  Collateral type is required
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label">Description</label>
                <input class="form-control" formControlName="description" />
              </div>
              <div class="col-md-3">
                <label class="form-label">Estimated value (NGN)</label>
                <input class="form-control" type="number" formControlName="value"
                       [class.is-invalid]="c.get('value')?.invalid && (c.get('value')?.dirty || c.get('value')?.touched)" />
                <div class="invalid-feedback" *ngIf="c.get('value')?.errors?.['required'] && (c.get('value')?.dirty || c.get('value')?.touched)">
                  Value is required
                </div>
                <div class="invalid-feedback" *ngIf="c.get('value')?.errors?.['min'] && (c.get('value')?.dirty || c.get('value')?.touched)">
                  Value must be at least ₦1
                </div>
              </div>
              <div class="col-md-2 text-end">
                <button type="button" class="btn btn-danger" (click)="removeCollateral(i)">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2">
          <button type="button" class="btn btn-outline-primary" (click)="addCollateral()">Add collateral</button>
        </div>
      </div>

      <div class="border rounded p-3">
        <h6>Co-signer / Guarantor (optional)</h6>
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Name</label>
            <input class="form-control" formControlName="cosignerName" />
          </div>
          <div class="col-md-4">
            <label class="form-label">Phone</label>
            <input class="form-control" formControlName="cosignerPhone" />
          </div>
          <div class="col-md-4">
            <label class="form-label">Relationship</label>
            <input class="form-control" formControlName="cosignerRelationship" />
          </div>
        </div>
      </div>
    </section>

    <!-- STEP 5: Bank & Documents -->
    <section *ngIf="step === 4">
      <h5>Bank, Payment & Documents</h5>

      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Bank</label>
          <select class="form-select" formControlName="bankName">
            <option value="">Select bank...</option>
            <option *ngFor="let b of banks">{{ b }}</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Account number</label>
          <input class="form-control" formControlName="accountNumber" />
        </div>

        <div class="col-md-12">
          <label class="form-label">Upload documents (ID, payslip, utility bill, CAC, etc)</label>

          <div formArrayName="documents">
            <div *ngFor="let d of documents.controls; let i = index" class="mb-2 border-bottom pb-3">
              <div class="row g-2 align-items-center">
                <div class="col-md-6">
                  <input type="file" (change)="onFileChange($event, i)" class="form-control" />
                </div>
                <div class="col-md-4">
                  <input class="form-control" placeholder="Document label (e.g. ID, Payslip)"
                         [value]="d.value?.label || ''" (input)="setDocLabel(i, $any($event.target).value)" />
                </div>
                <div class="col-md-2 text-end">
                  <button type="button" class="btn btn-danger" (click)="removeDocument(i)">Remove</button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-2">
            <button type="button" class="btn btn-outline-primary" (click)="addDocument()">Add document slot</button>
          </div>
        </div>
      </div>
    </section>

    <!-- STEP 6: Assessment & Review -->
    <section *ngIf="step === 5">
      <h5>Internal Assessment & Review</h5>

      <div class="row g-3 mb-3">
        <div class="col-md-3">
          <label class="form-label">DTI (%)</label>
          <div class="form-control-plaintext">{{ dti() | number:'1.0-2' }}</div>
        </div>
        <div class="col-md-3">
          <label class="form-label">Estimated monthly repayment (NGN)</label>
          <div class="form-control-plaintext">{{ estimatedMonthlyRepayment() | number:'1.0-2' }}</div>
        </div>
        <div class="col-md-3">
          <label class="form-label">LTV (%)</label>
          <div class="form-control-plaintext">{{ ltv() | number:'1.0-2' }}</div>
        </div>
        <div class="col-md-3">
          <label class="form-label">Max eligible loan (NGN)</label>
          <div class="form-control-plaintext">{{ maxEligibleLoan() | number:'1.0-0' }}</div>
        </div>

        <div class="col-md-4 mt-2">
          <label class="form-label">Risk category</label>
          <div [ngClass]="riskClass()" class="p-2 rounded">{{ riskCategory() }}</div>
        </div>

        <div class="col-md-4 mt-2">
          <label class="form-label">Approval probability</label>
          <div class="form-control-plaintext">{{ approvalProbability() | number:'1.0-0' }}%</div>
        </div>

        <div class="col-md-4 mt-2">
          <label class="form-label">Suggested decision</label>
          <div class="form-control-plaintext"><strong>{{ suggestedApproval() ? 'Approve' : 'Decline' }}</strong></div>
        </div>
      </div>

      <h6>Repayment schedule</h6>
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Month</th>
            <th>Payment</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Remaining balance</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of repaymentSchedule">
            <td>{{ r.month }}</td>
            <td>{{ r.payment | number:'1.0-2' }}</td>
            <td>{{ r.principal | number:'1.0-2' }}</td>
            <td>{{ r.interest | number:'1.0-2' }}</td>
            <td>{{ r.balance | number:'1.0-2' }}</td>
          </tr>
        </tbody>
      </table>

      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-secondary" (click)="generateRepaymentSchedule()">Regenerate schedule</button>
        <button type="button" class="btn btn-outline-primary" (click)="exportPdf()">Export PDF</button>
      </div>

      <hr />

      <h6>Review</h6>
      <pre>{{ loanForm.value | json }}</pre>
    </section>

    <!-- Form Status & Navigation buttons -->
    <div class="alert alert-warning" *ngIf="loanForm.invalid && step === steps.length - 1">
      <strong>Please fix the following issues before submitting:</strong>
      <ul class="mb-0 mt-1">
        <li *ngIf="fullName.invalid">• Full name is required</li>
        <li *ngIf="email.invalid">• Valid email is required</li>
        <li *ngIf="phone.invalid">• Phone number is required</li>
        <li *ngIf="dob.invalid">• Date of birth is required</li>
        <li *ngIf="employmentStatus.invalid">• Employment status is required</li>
        <li *ngIf="income.invalid">• Valid monthly income is required</li>
        <li *ngIf="loanType.invalid">• Loan type is required</li>
        <li *ngIf="amount.invalid">• Valid loan amount is required</li>
        <li *ngIf="term.invalid">• Valid loan term is required</li>
        <li *ngIf="interestRate.invalid">• Valid interest rate is required</li>
      </ul>
    </div>

    <div class="d-flex justify-content-between mt-3">
      <div>
        <button type="button" class="btn btn-outline-secondary" (click)="prevStep()" [disabled]="step === 0">Back</button>
      </div>
      <div>
        <button type="button" class="btn btn-outline-primary me-2" (click)="nextStep()" *ngIf="step < steps.length - 1"
                [disabled]="isCurrentStepInvalid()">Next</button>
        <button type="submit" class="btn btn-success" *ngIf="step === steps.length - 1"
                [disabled]="loanForm.invalid">Submit Application</button>
      </div>
    </div>

  </form>

</div>
  `,
  styles: [
    `:host { display: block; }
     .risk-low { background:#e6ffed; color:#08660d }
     .risk-medium { background:#fff7e6; color:#8a5f00 }
     .risk-high { background:#ffe6e6; color:#7a0d0d }
     .nav-link { cursor: pointer; }
     .is-invalid { border-color: #dc3545; }
     .invalid-feedback { display: block; }
     `
  ]
})
export class ApplyLoan {
  loanForm: FormGroup;
  repaymentSchedule: Array<any> = [];
  step = 0;
  steps = ['Applicant', 'Employment', 'Loan', 'Collateral', 'Bank & Docs', 'Assessment & Review'];

  banks = [
    'Access Bank', 'First Bank', 'GTBank', 'Zenith Bank', 'UBA', 'Sterling Bank', 'Fidelity Bank', 'Keystone Bank'
  ];

  loading = false;
  message = '';

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.loanForm = this.fb.group({
      // STEP 1
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      bvn: [''],
      address: [''],

      // STEP 2
      employmentStatus: ['', Validators.required],
      employer: [''],
      position: [''],
      income: [0, [Validators.required, Validators.min(0)]],
      debts: [0],
      businessType: [''],

      // STEP 3
      loanType: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1000)]],
      term: [12, [Validators.required, Validators.min(1)]],
      interestRate: [12, [Validators.required, Validators.min(0)]],
      gracePeriod: [0],
      insuranceIncluded: [false],
      purpose: [''],

      // STEP 4
      collaterals: this.fb.array([]),
      cosignerName: [''],
      cosignerPhone: [''],
      cosignerRelationship: [''],

      // STEP 5
      bankName: [''],
      accountNumber: [''],
      documents: this.fb.array([]),

      // Internal fields
      creditScore: [null],
      status: ['Pending']
    });

    this.addDocument();
  }

  // ---------------- Form Control Getters ----------------
  get fullName() { return this.loanForm.get('fullName')!; }
  get email() { return this.loanForm.get('email')!; }
  get phone() { return this.loanForm.get('phone')!; }
  get dob() { return this.loanForm.get('dob')!; }
  get employmentStatus() { return this.loanForm.get('employmentStatus')!; }
  get income() { return this.loanForm.get('income')!; }
  get loanType() { return this.loanForm.get('loanType')!; }
  get amount() { return this.loanForm.get('amount')!; }
  get term() { return this.loanForm.get('term')!; }
  get interestRate() { return this.loanForm.get('interestRate')!; }

  // ---------------- Collaterals ----------------
  get collaterals(): FormArray {
    return this.loanForm.get('collaterals') as FormArray;
  }

  addCollateral() {
    const g = this.fb.group({
      type: ['', Validators.required],
      description: [''],
      value: [0, [Validators.required, Validators.min(1)]]
    });
    this.collaterals.push(g);
  }

  removeCollateral(i: number) {
    this.collaterals.removeAt(i);
  }

  // ---------------- Documents ----------------
  get documents(): FormArray {
    return this.loanForm.get('documents') as FormArray;
  }

  addDocument() {
    this.documents.push(this.fb.control({ file: null, label: '' }));
  }

  removeDocument(i: number) {
    this.documents.removeAt(i);
  }

  onFileChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const ctrl = this.documents.at(index);
    ctrl.setValue({ ...(ctrl.value || {}), file });
  }

  setDocLabel(i: number, label: string) {
    const ctrl = this.documents.at(i);
    ctrl.setValue({ ...(ctrl.value || {}), label });
  }

  // ---------------- Stepper ----------------
  nextStep() {
    if (this.step < this.steps.length - 1) {
      this.markCurrentStepAsTouched();
      if (!this.isCurrentStepInvalid()) {
        this.step++;
        if (this.step === this.steps.length - 1) {
          this.generateRepaymentSchedule();
        }
      }
    }
  }

  prevStep() {
    if (this.step > 0) this.step--;
  }

  goToStep(i: number) {
    this.step = i;
  }

  // ---------------- Validation ----------------
  isCurrentStepInvalid(): boolean {
    switch (this.step) {
      case 0:
        return this.fullName.invalid || this.email.invalid || this.phone.invalid || this.dob.invalid;
      case 1:
        return this.employmentStatus.invalid || this.income.invalid;
      case 2:
        return this.loanType.invalid || this.amount.invalid || this.term.invalid || this.interestRate.invalid;
      default:
        return false;
    }
  }

  markCurrentStepAsTouched() {
    switch (this.step) {
      case 0:
        this.fullName.markAsTouched();
        this.email.markAsTouched();
        this.phone.markAsTouched();
        this.dob.markAsTouched();
        break;
      case 1:
        this.employmentStatus.markAsTouched();
        this.income.markAsTouched();
        break;
      case 2:
        this.loanType.markAsTouched();
        this.amount.markAsTouched();
        this.term.markAsTouched();
        this.interestRate.markAsTouched();
        break;
    }
  }

  // ---------------- Calculations ----------------
  dti(): number {
    const income = Number(this.loanForm.get('income')?.value) || 0;
    const debts = Number(this.loanForm.get('debts')?.value) || 0;
    const newRep = this.estimatedMonthlyRepayment();
    if (income === 0) return 0;
    return ((debts + newRep) / income) * 100;
  }

  totalCollateralValue(): number {
    return this.collaterals.controls.reduce((s, g) => s + (Number(g.get('value')?.value) || 0), 0);
  }

  ltv(): number {
    const total = this.totalCollateralValue();
    const requested = Number(this.loanForm.get('amount')?.value) || 0;
    if (requested === 0) return 0;
    return (requested / total) * 100;
  }

  estimatedMonthlyRepayment(): number {
    const P = Number(this.loanForm.get('amount')?.value) || 0;
    const rAnnual = Number(this.loanForm.get('interestRate')?.value) || 0;
    const nMonths = Number(this.loanForm.get('term')?.value) || 1;
    const r = rAnnual / 100 / 12;
    if (r === 0) return P / nMonths;
    const numerator = P * r * Math.pow(1 + r, nMonths);
    const denominator = Math.pow(1 + r, nMonths) - 1;
    return denominator === 0 ? P / nMonths : numerator / denominator;
  }

  maxEligibleLoan(): number {
    const income = Number(this.loanForm.get('income')?.value) || 0;
    const term = Number(this.loanForm.get('term')?.value) || 1;
    const affordableMonthly = income * 0.4;
    const rAnnual = Number(this.loanForm.get('interestRate')?.value) || 0;
    const r = rAnnual / 100 / 12;
    if (r === 0) return affordableMonthly * term;
    const denom = (r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
    return Math.floor(affordableMonthly / denom);
  }

  riskCategory(): string {
    const d = this.dti();
    const credit = Number(this.loanForm.get('creditScore')?.value) || 0;
    if (credit >= 700 && d <= 30) return 'Low';
    if (credit >= 600 && d <= 40) return 'Medium';
    return 'High';
  }

  riskClass(): string {
    const r = this.riskCategory();
    if (r === 'Low') return 'risk-low';
    if (r === 'Medium') return 'risk-medium';
    return 'risk-high';
  }

  approvalProbability(): number {
    let score = 50;
    const credit = Number(this.loanForm.get('creditScore')?.value) || 0;
    score += Math.min(20, credit / 10);
    const d = this.dti();
    score -= Math.min(30, d / 2);
    const requested = Number(this.loanForm.get('amount')?.value) || 0;
    const totalCollateral = this.totalCollateralValue();
    if (requested > 0) {
      const coverage = Math.min(100, (totalCollateral / requested) * 100);
      score += Math.min(20, coverage / 5);
    }
    if (score < 0) score = 0;
    if (score > 100) score = 100;
    return Math.round(score);
  }

  suggestedApproval(): boolean {
    const prob = this.approvalProbability();
    return prob >= 60;
  }

  // ---------------- Repayment Schedule ----------------
  generateRepaymentSchedule() {
    const P = Number(this.loanForm.get('amount')?.value) || 0;
    const rAnnual = Number(this.loanForm.get('interestRate')?.value) || 0;
    const n = Number(this.loanForm.get('term')?.value) || 1;
    const r = rAnnual / 100 / 12;

    this.repaymentSchedule = [];
    let balance = P;
    let monthly = this.estimatedMonthlyRepayment();

    for (let m = 1; m <= n; m++) {
      const interest = balance * r;
      const principal = monthly - interest;
      balance = Math.max(0, balance - principal);
      this.repaymentSchedule.push({ month: m, payment: monthly, principal, interest, balance });
    }
  }

  // ---------------- Submit to Firestore ----------------
  async onSubmit() {
    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched();
      alert('Please complete all required fields before submitting');
      return;
    }

    this.loading = true;
    this.message = '';

    const payload = { ...this.loanForm.value };
    payload.assessment = {
      dtiPercent: this.dti(),
      estimatedMonthlyRepayment: this.estimatedMonthlyRepayment(),
      totalCollateral: this.totalCollateralValue(),
      ltvPercent: this.ltv(),
      maxEligibleLoan: this.maxEligibleLoan(),
      riskCategory: this.riskCategory(),
      approvalProbability: this.approvalProbability(),
      suggestedApproval: this.suggestedApproval()
    };
    payload.createdOn = new Date();

    try {
      const loansRef = collection(this.firestore, 'LoanApplications');
      await addDoc(loansRef, payload);

      // ---- Update Statistics ----
      const statsData = {
        bank: payload.bankName,
        country: payload.address || 'Unknown',
        amount: payload.amount,
        nationality: payload.nationality || 'Unknown',
        gender: payload.gender || 'Unknown'
      };
      await this.updateStatistics(statsData);

      this.message = '✅ Loan application successfully submitted.';
      this.loanForm.reset();
      this.repaymentSchedule = [];
      this.step = 0;
    } catch (err) {
      console.error(err);
      this.message = '❌ Failed to submit loan application.';
    } finally {
      this.loading = false;
    }
  }

  private async updateStatistics(stats: any) {
    const statsRef = collection(this.firestore, 'Statistics');

    const updateField = async (field: string, value: string | number) => {
      if (!value) return;

      const docRef = doc(statsRef, field);
      const docSnap = await getDoc(docRef);

      // If doc exists, increment the specific value field; otherwise, create it
      if (docSnap.exists()) {
        const existingData = docSnap.data() || {};
        const currentCount = existingData[value] || 0;
        await updateDoc(docRef, { [value]: currentCount + 1 });
      } else {
        await setDoc(docRef, { [value]: 1 });
      }
    };

    await updateField('bank', stats.bank);
    await updateField('country', stats.country);
    await updateField('amount', stats.amount);
    await updateField('nationality', stats.nationality);
    await updateField('gender', stats.gender);
  }

  exportPdf() {

  }
}
