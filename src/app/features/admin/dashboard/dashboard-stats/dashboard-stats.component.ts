import { Component, signal, OnInit, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { NgClass, NgIf } from '@angular/common';
import {UserContextService} from '../../../system/auth/user-context.service';


@Component({
  selector: 'lh-dashboard-stats',
  imports: [NgClass, NgIf],
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.scss'],
})
export class DashboardStatsComponent implements OnInit {
  earning = signal<any>(null);
  balance = signal<any>(null);
  earningsBeforeTax = signal<any>(null);
  loadingEarning = signal(true);
  loadingBalance = signal(true);
  loadingEarningsBeforeTax = signal(true);
  private userContext = inject(UserContextService);
  get docId() {
    return this.userContext. vendor(); // 🔥 dynamic & reactive
  }

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.loadEarningDoc();
    this.loadBalanceDoc();
    this.loadEarningsBeforeTaxDoc();
  }

  async loadEarningDoc() {
    try {
      const docRef = doc(
        this.firestore,
        `vendors/${this.docId}/dashboardStatistics/earnings`
      );

      const snap = await getDoc(docRef);

      if (snap.exists()) {
        console.log('✅ EarningsBeforeTax document loaded:', snap.data());
        this.earning.set(snap.data());
      } else {
        console.warn('⚠️ EarningsBeforeTax document not found');
        this.earning.set(null);
      }
    } catch (error) {
      console.error('❌ Error loading EarningsBeforeTax document:', error);
      this.earning.set(null);
    } finally {
      this.loadingEarning.set(false);
    }
  }


  async loadBalanceDoc() {
    try {
      const docRef = doc(
        this.firestore,
        `vendors/${this.docId}/dashboardStatistics/balance`
      );

      const snap = await getDoc(docRef);

      if (snap.exists()) {
        console.log('✅ Balance document loaded:', snap.data());
        this.balance.set(snap.data());
      } else {
        console.warn('⚠️ Balance document not found');
        this.balance.set(null);
      }
    } catch (error) {
      console.error('❌ Error loading balance document:', error);
      this.balance.set(null);
    } finally {
      this.loadingBalance.set(false);
    }
  }


  async loadEarningsBeforeTaxDoc() {
    try {
      const docRef = doc(
        this.firestore,
        `vendors/${this.docId}/dashboardStatistics/EarningsBeforeTax`
      );

      const snap = await getDoc(docRef);

      if (snap.exists()) {
        console.log('✅ EarningsBeforeTax document loaded:', snap.data());
        this.earningsBeforeTax.set(snap.data());
      } else {
        console.warn('⚠️ EarningsBeforeTax document not found');
        this.earningsBeforeTax.set(null);
      }
    } catch (error) {
      console.error('❌ Error loading EarningsBeforeTax document:', error);
      this.earningsBeforeTax.set(null);
    } finally {
      this.loadingEarningsBeforeTax.set(false);
    }
  }

}
