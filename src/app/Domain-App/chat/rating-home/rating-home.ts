import { Component, signal, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-rating-home',
  imports: [
    RouterLink
  ],
  templateUrl: './rating-home.html',
  styleUrl: './rating-home.css'
})
export class RatingHome {
  satisfactory = signal(0);
  needsImprovement = signal(0);
  total = signal(0);
  percentSatisfactory = signal(0);
  percentNeedsImprovement = signal(0);

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadRatings();
  }

  loadRatings() {
    const ratingRef = doc(this.firestore, 'system_rating', 'rating');

    // Listen to live updates
    onSnapshot(ratingRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as any;
        const satisfactory = data.satisfactory || 0;
        const needsImprovement = data.needsImprovement || 0;
        const total = satisfactory + needsImprovement;

        this.satisfactory.set(satisfactory);
        this.needsImprovement.set(needsImprovement);
        this.total.set(total);

        // Calculate percentages
        this.percentSatisfactory.set(total ? Math.round((satisfactory / total) * 100) : 0);
        this.percentNeedsImprovement.set(total ? Math.round((needsImprovement / total) * 100) : 0);
      } else {
        // Initialize if doc doesn't exist
        this.satisfactory.set(0);
        this.needsImprovement.set(0);
        this.percentSatisfactory.set(0);
        this.percentNeedsImprovement.set(0);
      }
    });
  }
}
