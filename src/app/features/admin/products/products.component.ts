import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DocCounterComponent} from '../../shared/collection-count/collection-count.component';
import {ProductService} from '../../system/vendor/product.service';
import {Header} from '../../shared/header/header';
interface Product {
  id?: string;
  productID: string;
  name: string;
  basePrice: number;
  description: string;
  collection: string;
  brand: string;
  categories: string[];
  tags: string[];
  images: string[];
  customFields: { key: string; value: string }[];
  specifications: { key: string; value: string }[];
  video: string;
}




@Component({
  selector: 'lh-products',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule, DocCounterComponent, Header],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = signal(true);
  noProducts = signal(false);
  searchQuery = signal('');

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.productService.loadProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.noProducts.set(data.length === 0);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('❌ Error loading products:', err);
        this.loading.set(false);
        this.noProducts.set(true);
      },
    });
  }

  deleteProduct(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(id).then(() => {
      this.products = this.products.filter((p) => p.id !== id);
      this.filterProducts();
      this.noProducts.set(this.products.length === 0);
      console.log('🗑️ Product deleted successfully');
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.productService.filterProducts(
      this.products,
      this.searchQuery()
    );
  }


}
