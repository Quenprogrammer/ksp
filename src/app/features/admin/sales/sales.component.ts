import { Component, signal, OnInit, computed, inject } from '@angular/core';
import { NgIf, NgFor, DecimalPipe, CurrencyPipe, NgClass } from '@angular/common';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc, addDoc
} from '@angular/fire/firestore';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { DocCounterComponent } from '../../shared/collection-count/collection-count.component';
import { SelectComponent } from '../../shared/select/select.component';
import { Header } from '../../shared/header/header';

export interface SaleItem {
  name: string;
  price: number;
  qty: number;
  img: string;
}

export interface DeliveryInfo {
  estimatedDate: string;
  shippingMethod: string;
  shippingAddress: string;
}

export interface PaymentInfo {
  method: string;
  tax: number;
  shipping: number;
}

export interface Sale {
  id?: string;
  status: string;
  items: SaleItem[];
  delivery: DeliveryInfo;
  payment: PaymentInfo;
  total: number;
  earning: number;
  createdAt?: string;
}

@Component({
  selector: 'lh-sales',
  standalone: true,
  imports: [
    SelectComponent,
    NgIf,
    NgFor,
    DecimalPipe,
    LoadingComponent,
    CurrencyPipe,

    NgClass,
    DocCounterComponent,
    Header,
    ReactiveFormsModule,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent implements OnInit {

  loading = signal(true);
  noSales = signal(false);

  // Filters
  searchQuery = signal('');
  selectedPeriod = signal('Last 3 months');
  periodOptions = [
    'Current month',
    'Last month',
    'Last 3 months',
    'Last 6 months',
    'Last year',
    'All time',
  ];

  sales: Sale[] = [];

  openPreview = signal(false);
  selectedSale = signal<Sale | null>(null);

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadSales();
  }

  // Load data from the "sales" collection (root)
  loadSales(): void {
    const salesCollection = collection(this.firestore, `sales`);
    this.loading.set(true);

    collectionData(salesCollection, { idField: 'id' }).subscribe({
      next: (data) => {
        this.sales = (data as Sale[]).map((s) => ({
          ...s,
          createdAt: s['createdAt'] || new Date().toISOString(),
        }));
        this.loading.set(false);
        this.noSales.set(this.sales.length === 0);
      },
      error: (err) => {
        console.error('❌ Error loading sales:', err);
        this.loading.set(false);
        this.noSales.set(true);
      },
    });
  }

  // Filtered sales logic
  get filteredSales(): Sale[] {
    const query = this.searchQuery().toLowerCase().trim();
    const period = this.selectedPeriod();
    const now = new Date();

    const getMonthsAgo = (months: number) => {
      const d = new Date();
      d.setMonth(d.getMonth() - months);
      return d;
    };

    const startDate =
      period === 'Current month'
        ? new Date(now.getFullYear(), now.getMonth(), 1)
        : period === 'Last month'
          ? new Date(now.getFullYear(), now.getMonth() - 1, 1)
          : period === 'Last 3 months'
            ? getMonthsAgo(3)
            : period === 'Last 6 months'
              ? getMonthsAgo(6)
              : period === 'Last year'
                ? getMonthsAgo(12)
                : null;

    return this.sales.filter((sale) => {
      let inPeriod = true;
      if (startDate && sale.createdAt) {
        const saleDate = new Date(sale.createdAt);
        inPeriod = saleDate >= startDate;
      }

      const inSearch =
        !query ||
        sale.items.some((item) => item.name.toLowerCase().includes(query)) ||
        sale.status.toLowerCase().includes(query);

      return inSearch && inPeriod;
    });
  }

  // Delete a sale
  async deleteSale(saleId: string): Promise<void> {
    if (!saleId) return;
    if (!confirm('Are you sure you want to delete this sale?')) return;

    try {
      const saleDocRef = doc(this.firestore, `sales`, saleId);
      await deleteDoc(saleDocRef);

      console.log(`🗑️ Sale ${saleId} deleted successfully!`);
      this.sales = this.sales.filter((s) => s.id !== saleId);
      this.noSales.set(this.sales.length === 0);
    } catch (error) {
      console.error('❌ Error deleting sale:', error);
    }
  }

  viewSale(sale: Sale): void {
    this.selectedSale.set(sale);
    this.openPreview.set(true);
  }

  closePreview(): void {
    this.openPreview.set(false);
    this.selectedSale.set(null);
  }



  openAddForm = signal(false);

  saleForm = new FormGroup({
    status: new FormControl('Pending', Validators.required),

    // Sale Item
    itemName: new FormControl('', Validators.required),
    itemPrice: new FormControl<number | null>(null, Validators.required),
    itemQty: new FormControl<number | null>(1, Validators.required),
    itemImg: new FormControl('', ),

    // Delivery
    estimatedDate: new FormControl('', ),
    shippingMethod: new FormControl('', ),
    shippingAddress: new FormControl('', ),

    // Payment
    method: new FormControl('Card', Validators.required),
    tax: new FormControl<number | null>(0, Validators.required),
    shipping: new FormControl<number | null>(0, Validators.required),
  });
  async createSale() {
    if (this.saleForm.invalid) {
      alert("Please fill all fields");
      return;
    }

    const value = this.saleForm.value;

    const saleData: Sale = {
      status: value.status!,
      items: [
        {
          name: value.itemName!,
          price: value.itemPrice!,
          qty: value.itemQty!,
          img: value.itemImg!,
        }
      ],
      delivery: {
        estimatedDate: value.estimatedDate!,
        shippingMethod: value.shippingMethod!,
        shippingAddress: value.shippingAddress!,
      },
      payment: {
        method: value.method!,
        tax: value.tax!,
        shipping: value.shipping!,
      },
      total: (value.itemPrice! * value.itemQty!) + value.tax! + value.shipping!,
      earning: (value.itemPrice! * value.itemQty!), // adjust if needed
      createdAt: new Date().toISOString()
    };

    try {
      const salesCollection = collection(this.firestore, `sales`);
      await addDoc(salesCollection, saleData);

      alert("Sale added successfully!");
      this.openAddForm.set(false);
      this.saleForm.reset();
    } catch (error) {
      console.error("❌ Error adding sale:", error);
      alert("Error saving sale");
    }
  }

}
