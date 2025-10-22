import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

interface SimCard {
  id?: string;
  provider: string;
  country: string;
  networkType: string;
  simCode: string;
}
@Component({
  selector: 'app-si-modules',
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './si-modules.html',
  styleUrl: './si-modules.css'
})
export class SiModules {
  simProvider = '';
  simCountry = '';
  simNetworkType = '';
  simCode = '';
  loading = false;
  message = '';

  sims$!: Observable<SimCard[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const simCollection = collection(this.firestore, 'SimCards');
    this.sims$ = collectionData(simCollection, { idField: 'id' }) as Observable<SimCard[]>;
  }
}
