import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {NoDocumentComponent} from '../../shared/no-document/no-document.component';
import {DocCounterComponent} from '../../shared/collection-count/collection-count.component';
import {UserContextService} from '../../system/auth/user-context.service';


export interface Review {
  id?: string; // Add ID to enable deletion
  productName: string;
  productImg: string;
  productLink: string;
  price: number;
  date: string;
  rating: number;
  color: string;
  model: string;
  pros: string;
  cons: string;
  comment: string;
}

@Component({
  selector: 'lh-my-reviews',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CurrencyPipe,
    LoadingComponent,
    NoDocumentComponent,
    DocCounterComponent,
  ],
  templateUrl: './my-reviews.component.html',
  styleUrl: './my-reviews.component.scss',
})
export class MyReviewsComponent implements OnInit {
  openReview = signal(false);
  selectedReview = signal<Review | null>(null);
  reviews: Review[] = [];
  loading = signal(true);
  error = signal<string | null>(null);

  private userContext = inject(UserContextService);
  get docId() {
    return this.userContext.vendor(); // 🔥 dynamic & reactive
  }

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.loadReviews();
  }

  /** Load reviews */
  loadReviews() {
    const reviewsCollection = collection(
      this.firestore,
      `vendors/${this.docId}/myReview`
    );
    collectionData(reviewsCollection, { idField: 'id' }).subscribe({
      next: (data: any[]) => {
        this.reviews = data as Review[];
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.error.set('Failed to load reviews.');
        this.loading.set(false);
      },
    });
  }

  /** Open selected review */
  viewReview(review: Review) {
    this.selectedReview.set(review);
    this.openReview.set(true);
  }

  /** Close offcanvas */
  closeReview() {
    this.openReview.set(false);
    this.selectedReview.set(null);
  }

  /** Delete a review */
  async deleteReview(review: Review) {
    if (!review.id) return alert('Missing document ID.');

    const confirmDelete = confirm(
      `Are you sure you want to delete the review for "${review.productName}"?`
    );
    if (!confirmDelete) return;

    try {
      const reviewDocRef = doc(
        this.firestore,
        `vendors/${this.docId}/myReview/${review.id}`
      );
      await deleteDoc(reviewDocRef);
      this.reviews = this.reviews.filter((r) => r.id !== review.id);
      this.closeReview();
      alert('Review deleted successfully.');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
  }

  /** Display stars */
  getStars(rating: number): number[] {
    return Array(Math.round(rating || 0)).fill(0);
  }
}
