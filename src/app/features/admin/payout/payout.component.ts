import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe, NgClass, NgForOf, NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {Modal} from '../../system/modal';
import {LoadingComponent} from '../../shared/loading/loading.component';
import {NoDocumentComponent} from '../../shared/no-document/no-document.component';
import {Payout, PayoutService} from '../../system/payout.service';
import {Header} from '../../shared/header/header';

@Component({
  selector: 'lh-payout',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    Modal,
    LoadingComponent,
    NoDocumentComponent,
    CurrencyPipe,
    FormsModule,
    Header,
  ],
  templateUrl: './payout.component.html',
  styleUrl: './payout.component.scss',
})
export class PayoutComponent implements OnInit {
  // 🔹 Signals and local state
  exportData = signal(false);
  payouts = signal<Payout[]>([]);
  loading = signal(true);
  error = signal('');

  // 🔹 Local variables for filtering
  searchQuery = '';
  filteredPayouts: Payout[] = [];

  constructor(private payoutService: PayoutService) {}

  ngOnInit(): void {
    this.fetchPayouts();
  }

  /** 🔹 Fetch Payouts from Firestore */
  fetchPayouts(): void {
    this.loading.set(true);
    this.payoutService.getPayouts().subscribe({
      next: (data) => {
        this.payouts.set(data);
        this.filteredPayouts = data; // initialize filtered list
        this.loading.set(false);
        this.error.set('');
      },
      error: (err) => {
        console.error('❌ Failed to load payouts:', err);
        this.error.set('Failed to load payout data.');
        this.loading.set(false);
      },
    });
  }

  /** 🔹 Search payouts by amount, method, or status */
  filterPayouts(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredPayouts = this.payouts();
      return;
    }

    this.filteredPayouts = this.payouts().filter((p) => {
      const amountMatch = p.amount?.toString().includes(query);
      const methodMatch = p.method?.toLowerCase().includes(query);
      const statusMatch = p.status?.toLowerCase().includes(query);
      return amountMatch || methodMatch || statusMatch;
    });
  }

  /** 🔹 Delete a payout record */
  async onDelete(payout: Payout): Promise<void> {
    if (!payout.id) return;
    const confirmDelete = confirm(`Delete payout of ₦${payout.amount}?`);
    if (!confirmDelete) return;

    try {
      await this.payoutService.deletePayout(payout.id);
      console.log(`🗑️ Payout ${payout.id} deleted successfully!`);
      this.payouts.set(this.payouts().filter((p) => p.id !== payout.id));
      this.filteredPayouts = this.filteredPayouts.filter(
        (p) => p.id !== payout.id
      );
    } catch (error) {
      console.error('❌ Error deleting payout:', error);
    }
  }

  /** 🔹 Open export confirmation modal */
  openExportModal(): void {
    this.exportData.set(true);
  }

  /** 🔹 Close export modal */
  closeErrorModal(): void {
    this.exportData.set(false);
  }

  /** 🔹 Export data to Excel */
  onExportData(): void {
    this.payoutService.exportToExcel(this.filteredPayouts);
    this.closeErrorModal();
  }
}
