import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ksp');

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      basePrice: [0, [Validators.required, Validators.min(0)]],
      categories: this.fb.array([]),
      collection: [''],
      brand: [''],
      tags: this.fb.array([]),
      images: this.fb.array([]),
      customFields: this.fb.array([])
    });
  }

  // === Categories ===
  get categories(): FormArray {
    return this.productForm.get('categories') as FormArray;
  }

  addCategory(value: string) {
    const trimmedValue = value?.trim();
    if (trimmedValue && trimmedValue !== '') {
      // Check for duplicates
      const existingCategories = this.categories.controls.map(ctrl => ctrl.value);
      if (!existingCategories.includes(trimmedValue)) {
        this.categories.push(this.fb.control(trimmedValue));
      }
    }
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }

  // === Tags ===
  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  addTag(value: string) {
    const trimmedValue = value?.trim();
    if (trimmedValue && trimmedValue !== '') {
      // Check for duplicates
      const existingTags = this.tags.controls.map(ctrl => ctrl.value);
      if (!existingTags.includes(trimmedValue)) {
        this.tags.push(this.fb.control(trimmedValue));
      }
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  // === Images ===
  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  addImage(url: string) {
    const trimmedUrl = url?.trim();
    if (trimmedUrl && trimmedUrl !== '') {
      this.images.push(this.fb.control(trimmedUrl));
    }
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  // === Custom Fields ===
  get customFields(): FormArray {
    return this.productForm.get('customFields') as FormArray;
  }

  addCustomField() {
    this.customFields.push(
      this.fb.group({
        key: ['', Validators.required],
        value: ['', Validators.required]
      })
    );
  }

  removeCustomField(index: number) {
    this.customFields.removeAt(index);
  }

  // === Submit ===
  saveProduct() {
    if (this.productForm.valid) {
      console.log('Base Product Data:', this.productForm.value);
      // TODO: Save to Firestore or API
      alert('Product saved successfully!');
    } else {
      this.productForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
    }
  }
}
