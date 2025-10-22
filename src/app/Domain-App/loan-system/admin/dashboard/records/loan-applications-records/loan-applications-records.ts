
import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
interface Loan {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  loanType: string;
  amount: number;
  term: number;
  status: string;
  assessment?: any;
}

@Component({
  selector: 'app-loan-applications-records',
  imports: [
    NgIf,
    DecimalPipe,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './loan-applications-records.html',
  styleUrl: './loan-applications-records.css'
})
export class LoanApplicationsRecords implements OnInit  {
  loans$!: Observable<Loan[]>;
  selectedLoan: Loan | null = null;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const loanCollection = collection(this.firestore, 'LoanApplications');
    this.loans$ = collectionData(loanCollection, { idField: 'id' }) as Observable<Loan[]>;
  }

  async viewLoan(loan: Loan) {
    this.selectedLoan = loan;
  }

  closeDetails() {
    this.selectedLoan = null;
  }
}
