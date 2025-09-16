import {Component, inject, Input, OnInit} from '@angular/core';
import {collection, Firestore, getCountFromServer} from '@angular/fire/firestore';

@Component({
  selector: 'app-collection-count',
  imports: [],
  templateUrl: './collection-count.component.html',
  styleUrl: './collection-count.component.css'
})
export class CollectionCountComponent implements OnInit {
  @Input() collection!: string;
  private firestore = inject(Firestore);
  totalDocs: number = 0;

  async ngOnInit() {
    const collRef = collection(this.firestore, this.collection);
    const snapshot = await getCountFromServer(collRef);
    this.totalDocs = snapshot.data().count;
  }
}
