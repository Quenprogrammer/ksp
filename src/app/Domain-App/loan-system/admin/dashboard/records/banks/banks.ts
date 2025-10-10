import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HeaderPoly } from '../../../../../chat/request/header-poly/header-poly';

// Define the Bank interface
interface Bank {
  id?: string;
  name: string;
  website: string;
  country: string;
  swiftCode: string;
  logoUrl: string;
}

@Component({
  selector: 'app-banks',
  standalone: true, // Ensure this is standalone if you're using imports
  imports: [

    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './banks.html',
  styleUrls: ['./banks.css'] // Corrected property name
})
export class Banks implements OnInit {
  bankName = '';
  bankWebsite = '';
  bankCountry = '';
  bankSwift = '';
  logoFile: File | null = null;
  loading = false;
  message = '';

  banks$!: Observable<Bank[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const bankCollection = collection(this.firestore, 'Banks');
    this.banks$ = collectionData(bankCollection, { idField: 'id' }) as Observable<Bank[]>;
  }
}
