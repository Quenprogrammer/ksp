import { Component, OnInit, signal } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {HeaderPoly} from '../Domain-App/chat/request/header-poly/header-poly';

@Component({
  selector: 'app-post',
  imports: [
    NgClass,
    NgForOf,
    DatePipe,
    NgIf,
    HeaderPoly
  ],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post {
  docs$: Observable<any[]> | undefined;
  allDocs: any[] = [];
  loading = signal(true);

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const docsRef = collection(this.firestore, 'posts'); // replace with your collection name
    this.docs$ = collectionData(docsRef, { idField: 'id' });
    this.docs$.subscribe(data => {
      this.allDocs = data;
      this.loading.set(false);
    });
  }
}
