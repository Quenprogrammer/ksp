import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {UserContextService} from './auth/user-context.service';


export interface Payout {
  id?: string;
  amount: string;
  amountValue: number;
  method: string;
  date: string;
   total: number;
  status: string;
tax:number;
}

@Injectable({
  providedIn: 'root'
})
export class PayoutService {
  private firestore = inject(Firestore);
  private userContext = inject(UserContextService);
  get docId() {
    return this.userContext. vendor(); // 🔥 dynamic & reactive
  }

  // 🔹 Fetch all payouts
  getPayouts(): Observable<Payout[]> {
    const payoutsRef = collection(this.firestore, `vendors/${this.docId}/payouts`);
    return collectionData(payoutsRef, { idField: 'id' }) as Observable<Payout[]>;
  }

  // 🔹 Delete a payout
  async deletePayout(id: string): Promise<void> {
    const docRef = doc(this.firestore, `vendors/${this.docId}/payouts`);
    await deleteDoc(docRef);
  }

  // 🔹 Export data to Excel
  exportToExcel(payouts: Payout[]): void {
    const worksheetData = payouts.map((payout) => ({
      Amount: payout.amount,
      Method: payout.method,
      'Date Processed': payout.date,
      Status: payout.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payouts');

    const buffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `Payouts_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
}
