import { Component } from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, CurrencyPipe, NgForOf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-application',
  imports: [
    FormsModule,
    AsyncPipe,
    SlicePipe,
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './application.html',
  styleUrl: './application.css'
})
export class Application {
  loans$!: Observable<any[]>;
  searchTerm = '';

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const colRef = collection(this.firestore, 'loans');
    this.loans$ = collectionData(colRef, { idField: 'id' });
  }

  // simple search filter
  filterLoans(loans: any[]) {
    if (!this.searchTerm) return loans;
    return loans.filter(l =>
      l.fullName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      l.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      l.status?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
