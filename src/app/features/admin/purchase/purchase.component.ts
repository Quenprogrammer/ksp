import {Component, OnInit, inject, signal} from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoDocumentComponent } from '../../shared/no-document/no-document.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Purchase, PurchaseService } from '../../system/vendor/purchase.service';
import { Header } from '../../shared/header/header';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import {Modal} from '../../system/modal';

@Component({
  selector: 'lh-purchase',
  standalone: true,
  imports: [NgForOf, NgIf, NoDocumentComponent, LoadingComponent, FormsModule, Header, AsyncPipe, Modal, CurrencyPipe],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  private purchaseService = inject(PurchaseService);
  private firestore = inject(Firestore);

  purchases: Purchase[] = [];
  filteredPurchases: Purchase[] = [];
  loading = true;
  searchTerm = '';

  // ✔ Categories dropdown
  categories = ['Cloth', 'Device', 'Shoes', 'Electronics', 'Other'];

  // ✔ Map categories to product images
  productImages: Record<string, string> = {
    cloth: 'adminIcon/items/cloth.png',
    device: 'adminIcon/items/device.png',
    shoes: 'adminIcon/items/shoes.png',
    electronics: 'adminIcon/items/electronics.png',
    other: 'adminIcon/items/other.png',
  };

  // ✔ New purchase model
// ✔ New purchase model
  newPurchase: Purchase = {
    productName: '',
    productLink: '',
    productImage: '',
    author: { name: '', avatar: 'adminIcon/img_6.png' },
    category: '',
    date: '',
    license: '',
    price: 0, // NEW
  };


  ngOnInit(): void {
    this.purchaseService.getPurchases().subscribe({
      next: (data) => {
        this.purchases = data;
        this.filteredPurchases = [...this.purchases];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading purchases:', err);
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    this.filteredPurchases = this.purchaseService.filterPurchases(this.purchases, this.searchTerm);
  }

  // 🔥 Called when user selects a category
  updateCategory(category: string) {
    this.newPurchase.category = category;
    const key = category.toLowerCase();
    this.newPurchase.productImage = this.productImages[key] || this.productImages['other'];
  }

  // 🔥 Add purchase
  async addPurchase() {
    try {
      if (!this.newPurchase.category) {
        alert('Please select a category.');
        return;
      }
      if (!this.newPurchase.productName) {
        alert('Please enter product name.');
        return;
      }
      if (!this.newPurchase.price || this.newPurchase.price <= 0) {
        alert('Please enter a valid price.');
        return;
      }

      // Auto-set date
      this.newPurchase.date = new Date().toISOString().split('T')[0];

      const purchasesRef = collection(this.firestore, 'purchases');
      await addDoc(purchasesRef, this.newPurchase);

      alert('Purchase added successfully!');

      // Reset form
      this.newPurchase = {
        productName: '',
        productLink: '',
        productImage: '',
        author: { name: '', avatar: 'adminIcon/img_6.png' },
        category: '',
        date: '',
        license: '',
        price: 0,
      };
    } catch (error) {
      console.error('Error adding purchase:', error);
      alert('Failed to add purchase.');
    }
  }


  selectedPurchase = signal<Purchase | null>(null);
  modal = signal(false);
  addNew = signal(false);

  // Open modal with purchase info
  openModal(purchase: Purchase) {
    this.selectedPurchase.set(purchase);
    this.modal.set(true);
  }

  // Close modal
  closeModal() {
    this.selectedPurchase.set(null);
    this.modal.set(false);
  }
  closeAddNew() {

    this.addNew.set(false);
  }
}
