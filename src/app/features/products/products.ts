import { Component, AfterViewInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SwiperOptions } from 'swiper/types';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import
import {RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Also add FormsModule if using template-driven forms

interface Category {
  id: number;
  name: string;
  count: number;
}

interface Brand {
  id: number;
  name: string;
  count: number;
}

interface Size {
  id: string;
  label: string;
}

interface Color {
  id: string;
  name: string;
  hex: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  sale: boolean;
  sizes: string[];
  colors: string[];
  brand: string;
  category: string;
}

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule, FormsModule,RouterLink, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent {
  // Mobile sidebar state
  isSidebarOpen = false;

  // Accordion states
  accordionStates = {
    categories: true,
    price: true,
    brands: true,
    size: true,
    color: true,
    status: true
  };

  // Filter states
  selectedCategories = new Set<number>();
  selectedBrands = new Set<number>();
  selectedSizes = new Set<string>();
  selectedColors = new Set<string>();
  priceMin = 0;
  priceMax = 200;
  inStock = false;
  onSale = false;
  freeDelivery = false;

  // Categories
  categories: Category[] = [
    { id: 1, name: 'Blazers & Suits', count: 235 },
    { id: 2, name: 'Blouses', count: 235 },
    { id: 3, name: 'Cardigans & Jumpers', count: 107 },
    { id: 4, name: 'Dresses', count: 93 },
    { id: 5, name: 'Hoodie & Sweatshirts', count: 122 },
    { id: 6, name: 'Jackets & Coats', count: 116 },
    { id: 7, name: 'Jeans', count: 215 },
    { id: 8, name: 'Lingerie', count: 150 },
    { id: 9, name: 'Maternity Wear', count: 8 },
    { id: 10, name: 'Nightwear', count: 26 },
    { id: 11, name: 'Shirts & Tops', count: 164 },
    { id: 12, name: 'Shorts', count: 147 },
    { id: 13, name: 'Socks & Tights', count: 139 },
    { id: 14, name: 'Sportswear', count: 65 },
    { id: 15, name: 'Swimwear', count: 18 },
    { id: 16, name: 'T-shirts & Vests', count: 209 },
    { id: 17, name: 'Trousers', count: 105 },
    { id: 18, name: 'Underwear', count: 87 }
  ];

  // Brands
  brands: Brand[] = [
    { id: 1, name: 'Adidas', count: 425 },
    { id: 2, name: 'Ann Taylor', count: 15 },
    { id: 3, name: 'Armani', count: 18 },
    { id: 4, name: 'Banana Republic', count: 103 },
    { id: 5, name: 'Bilabong', count: 27 },
    { id: 6, name: 'Birkenstock', count: 10 },
    { id: 7, name: 'Calvin Klein', count: 365 },
    { id: 8, name: 'Columbia', count: 508 },
    { id: 9, name: 'Converse', count: 176 },
    { id: 10, name: 'Dockers', count: 54 },
    { id: 11, name: 'Fruit of the Loom', count: 739 },
    { id: 12, name: 'Hanes', count: 92 },
    { id: 13, name: 'Jimmy Choo', count: 17 },
    { id: 14, name: 'Levi\'s', count: 361 },
    { id: 15, name: 'Men\'s Wearhouse', count: 75 },
    { id: 16, name: 'New Balance', count: 218 },
    { id: 17, name: 'Nike', count: 810 },
    { id: 18, name: 'Old Navy', count: 147 },
    { id: 19, name: 'Puma', count: 370 },
    { id: 20, name: 'Skechers', count: 209 },
    { id: 21, name: 'Tommy Hilfiger', count: 487 },
    { id: 22, name: 'Under Armour', count: 90 }
  ];

  filteredBrands: Brand[] = [...this.brands];
  brandSearch = '';

  // Sizes
  sizes: Size[] = [
    { id: 'xxs', label: 'XXS' },
    { id: 'xs', label: 'XS' },
    { id: 's', label: 'S' },
    { id: 'm', label: 'M' },
    { id: 'l', label: 'L' },
    { id: 'xl', label: 'XL' },
    { id: '2xl', label: '2XL' },
    { id: '40', label: '40' },
    { id: '42', label: '42' },
    { id: '44', label: '44' },
    { id: '45', label: '45' },
    { id: '46', label: '46' },
    { id: '48', label: '48' },
    { id: '50', label: '50' },
    { id: '52', label: '52' }
  ];

  // Colors
  colors: Color[] = [
    { id: 'green', name: 'Green', hex: '#8bc4ab' },
    { id: 'red', name: 'Coral red', hex: '#ee7976' },
    { id: 'pink', name: 'Pink', hex: '#df8fbf' },
    { id: 'blue', name: 'Sky blue', hex: '#9acbf1' },
    { id: 'black', name: 'Black', hex: '#364254' },
    { id: 'white', name: 'White', hex: '#e0e5eb' }
  ];

  // Active filters display
  activeFilters: string[] = [];

  // Sort options
  sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];
  selectedSort = 'relevance';

  // Products (example data)
  products: Product[] = [
    {
      id: 1,
      name: 'Denim midi skirt with pockets',
      price: 126.50,
      originalPrice: 156.00,
      image: 'assets/img/shop/fashion/01.png',
      sale: true,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['#284971', '#8b9bc4'],
      brand: 'Levi\'s',
      category: 'Dresses'
    },
    {
      id: 2,
      name: 'Cotton lace blouse with necklace',
      price: 54.00,
      image: 'assets/img/shop/fashion/02.png',
      sale: false,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['#dcb1b1', '#ced6f0', '#e1e0cf'],
      brand: 'Ann Taylor',
      category: 'Blouses'
    },
    {
      id: 3,
      name: 'Sneakers with a massive sole',
      price: 86.50,
      image: 'assets/img/shop/fashion/03.png',
      sale: false,
      sizes: ['6', '6.5', '7', '7.5'],
      colors: ['#e0e5eb', '#364254'],
      brand: 'Adidas',
      category: 'Sportswear'
    },
    // Add more products as needed
  ];

  filteredProducts: Product[] = [...this.products];
  displayedProducts = 6;

  @ViewChild('sidebar') sidebar!: ElementRef;

  constructor() {}

  ngOnInit() {
    this.updateActiveFilters();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isSidebarOpen && this.sidebar?.nativeElement &&
      !this.sidebar.nativeElement.contains(event.target)) {
      this.closeSidebar();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 992) {
      this.isSidebarOpen = false;
    }
  }

  // Toggle methods
  toggleCategory(categoryId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedCategories.add(categoryId);
    } else {
      this.selectedCategories.delete(categoryId);
    }
    this.applyFilters();
    this.updateActiveFilters();
  }

  toggleBrand(brandId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedBrands.add(brandId);
    } else {
      this.selectedBrands.delete(brandId);
    }
    this.applyFilters();
    this.updateActiveFilters();
  }

  toggleSize(sizeId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedSizes.add(sizeId);
    } else {
      this.selectedSizes.delete(sizeId);
    }
    this.applyFilters();
    this.updateActiveFilters();
  }

  toggleColor(colorId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedColors.add(colorId);
    } else {
      this.selectedColors.delete(colorId);
    }
    this.applyFilters();
    this.updateActiveFilters();
  }

  updatePriceMin(event: Event): void {
    this.priceMin = +(event.target as HTMLInputElement).value;
    this.applyFilters();
    this.updateActiveFilters();
  }

  updatePriceMax(event: Event): void {
    this.priceMax = +(event.target as HTMLInputElement).value;
    this.applyFilters();
    this.updateActiveFilters();
  }

  toggleAccordion(section: keyof typeof this.accordionStates): void {
    this.accordionStates[section] = !this.accordionStates[section];
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  filterBrands(): void {
    if (!this.brandSearch.trim()) {
      this.filteredBrands = [...this.brands];
      return;
    }

    const searchTerm = this.brandSearch.toLowerCase();
    this.filteredBrands = this.brands.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm)
    );
  }

  clearBrandSearch(): void {
    this.brandSearch = '';
    this.filterBrands();
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      // Category filter
      if (this.selectedCategories.size > 0) {
        const category = this.categories.find(c => c.name === product.category);
        if (!category || !this.selectedCategories.has(category.id)) {
          return false;
        }
      }

      // Brand filter
      if (this.selectedBrands.size > 0) {
        const brand = this.brands.find(b => b.name === product.brand);
        if (!brand || !this.selectedBrands.has(brand.id)) {
          return false;
        }
      }

      // Size filter
      if (this.selectedSizes.size > 0) {
        const hasSize = product.sizes.some(size =>
          this.selectedSizes.has(size.toLowerCase())
        );
        if (!hasSize) {
          return false;
        }
      }

      // Price filter
      if (product.price < this.priceMin || product.price > this.priceMax) {
        return false;
      }

      // Sale filter
      if (this.onSale && !product.sale) {
        return false;
      }

      // In stock filter (simplified - assuming all products are in stock for now)
      if (this.inStock) {
        // Add actual stock check logic here if you have stock data
      }

      return true;
    });

    this.sortProducts();
  }

  sortProducts(): void {
    switch(this.selectedSort) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        // Simple popularity sort by ID (replace with actual popularity data)
        this.filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case 'newest':
        // Simple newest sort by ID (replace with actual date data)
        this.filteredProducts.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for relevance
        this.filteredProducts = [...this.products.filter(p =>
          // Re-apply filters but keep original order
          this.passesFilters(p)
        )];
        break;
    }
  }

  private passesFilters(product: Product): boolean {
    // Category filter
    if (this.selectedCategories.size > 0) {
      const category = this.categories.find(c => c.name === product.category);
      if (!category || !this.selectedCategories.has(category.id)) {
        return false;
      }
    }

    // Brand filter
    if (this.selectedBrands.size > 0) {
      const brand = this.brands.find(b => b.name === product.brand);
      if (!brand || !this.selectedBrands.has(brand.id)) {
        return false;
      }
    }

    // Size filter
    if (this.selectedSizes.size > 0) {
      const hasSize = product.sizes.some(size =>
        this.selectedSizes.has(size.toLowerCase())
      );
      if (!hasSize) {
        return false;
      }
    }

    // Price filter
    if (product.price < this.priceMin || product.price > this.priceMax) {
      return false;
    }

    // Sale filter
    if (this.onSale && !product.sale) {
      return false;
    }

    // In stock filter
    if (this.inStock) {
      // Add stock check logic here
    }

    return true;
  }

  updateActiveFilters(): void {
    this.activeFilters = [];

    // Add categories
    this.selectedCategories.forEach(categoryId => {
      const category = this.categories.find(c => c.id === categoryId);
      if (category) {
        this.activeFilters.push(category.name);
      }
    });

    // Add brands
    this.selectedBrands.forEach(brandId => {
      const brand = this.brands.find(b => b.id === brandId);
      if (brand) {
        this.activeFilters.push(brand.name);
      }
    });

    // Add sizes
    this.selectedSizes.forEach(sizeId => {
      const size = this.sizes.find(s => s.id === sizeId);
      if (size) {
        this.activeFilters.push(`Size: ${size.label}`);
      }
    });

    // Add colors
    this.selectedColors.forEach(colorId => {
      const color = this.colors.find(c => c.id === colorId);
      if (color) {
        this.activeFilters.push(color.name);
      }
    });

    // Add sale filter
    if (this.onSale) {
      this.activeFilters.push('Sale');
    }

    // Add price range
    if (this.priceMin > 0 || this.priceMax < 200) {
      this.activeFilters.push(`$${this.priceMin} - $${this.priceMax}`);
    }
  }

  removeFilter(filter: string): void {
    // Remove from categories
    const category = this.categories.find(c => c.name === filter);
    if (category) {
      this.selectedCategories.delete(category.id);
      this.applyFilters();
      return;
    }

    // Remove from brands
    const brand = this.brands.find(b => b.name === filter);
    if (brand) {
      this.selectedBrands.delete(brand.id);
      this.applyFilters();
      return;
    }

    // Remove from sizes
    const sizeMatch = filter.match(/Size: (.+)/);
    if (sizeMatch) {
      const sizeLabel = sizeMatch[1];
      const size = this.sizes.find(s => s.label === sizeLabel);
      if (size) {
        this.selectedSizes.delete(size.id);
        this.applyFilters();
        return;
      }
    }

    // Remove from colors
    const color = this.colors.find(c => c.name === filter);
    if (color) {
      this.selectedColors.delete(color.id);
      this.applyFilters();
      return;
    }

    // Remove sale filter
    if (filter === 'Sale') {
      this.onSale = false;
      this.applyFilters();
      return;
    }

    // Remove price filter
    const priceMatch = filter.match(/\$(\d+) - \$(\d+)/);
    if (priceMatch) {
      this.priceMin = 0;
      this.priceMax = 200;
      this.applyFilters();
      return;
    }
  }

  clearAllFilters(): void {
    this.selectedCategories.clear();
    this.selectedBrands.clear();
    this.selectedSizes.clear();
    this.selectedColors.clear();

    this.priceMin = 0;
    this.priceMax = 200;
    this.inStock = false;
    this.onSale = false;
    this.freeDelivery = false;

    this.brandSearch = '';
    this.filterBrands();
    this.applyFilters();
  }

  loadMore(): void {
    this.displayedProducts += 6;
  }

  trackById(index: number, item: any): any {
    return item.id || index;
  }
}
