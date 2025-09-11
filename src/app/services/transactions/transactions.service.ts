import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { takeUntil, catchError } from 'rxjs/operators';

export interface FirebaseDocument {
    id?: string;
    totalAmount?: number; // Standardized for both debits and credits
}

@Injectable({
    providedIn: 'root'
})
export class TransactionsService implements OnDestroy {
    private totalDebitSubject = new BehaviorSubject<FirebaseDocument[]>([]);
    totalDebits$ = this.totalDebitSubject.asObservable();

    private totalCreditSubject = new BehaviorSubject<FirebaseDocument[]>([]);
    totalCredits$ = this.totalCreditSubject.asObservable();

    private balanceSubject = new BehaviorSubject<number>(0);
    balance$ = this.balanceSubject.asObservable();

    private profitPercentageSubject = new BehaviorSubject<number>(0);
    profitPercentage$ = this.profitPercentageSubject.asObservable();

    private deletedExpensesTotalSubject = new BehaviorSubject<number>(0);
  deletedExpensesTotal$ = this.deletedExpensesTotalSubject.asObservable();


  private deletedIncomeTotalSubject = new BehaviorSubject<number>(0);
  deletedIncomeTotal$ = this.deletedIncomeTotalSubject.asObservable();

    private unsubscribe$ = new Subject<void>();

    constructor(private firestore: Firestore) {
        this.loadTotalDebits();
        this.loadTotalCredits();
    }

    private loadTotalDebits(): void {
        const colRef = collection(this.firestore, 'totalDebit');
        collectionData(colRef, { idField: 'id' })
            .pipe(
                takeUntil(this.unsubscribe$),
                catchError((error) => {
                    console.error('Error fetching totalDebits:', error);
                    return of([]); // Ensures subscription doesn't fail
                })
            )
            .subscribe((data: FirebaseDocument[]) => {
                this.totalDebitSubject.next(data);
                this.calculateBalanceAndProfit();
            });
    }

    private loadTotalCredits(): void {
        const colRef = collection(this.firestore, 'totalCredit');
        collectionData(colRef, { idField: 'id' })
            .pipe(
                takeUntil(this.unsubscribe$),
                catchError((error) => {
                    console.error('Error fetching totalCredits:', error);
                    return of([]); // Ensures subscription doesn't fail
                })
            )
            .subscribe((data: FirebaseDocument[]) => {
                this.totalCreditSubject.next(data);
                this.calculateBalanceAndProfit();
            });
    }

    private calculateBalanceAndProfit(): void {
        const totalDebits = this.totalDebitSubject.getValue().reduce((sum, item) => sum + (item.totalAmount || 0), 0);
        const totalCredits = this.totalCreditSubject.getValue().reduce((sum, item) => sum + (item.totalAmount || 0), 0);

        // ✅ Corrected Balance Calculation
        const balance = totalCredits - totalDebits;
        this.balanceSubject.next(balance);

        // ✅ Corrected Profit Percentage Calculation
        const profitPercentage = totalDebits > 0 ? ((totalCredits - totalDebits) / totalDebits) * 100 : 0;
        this.profitPercentageSubject.next(profitPercentage);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
