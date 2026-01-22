import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-upload-post',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  template: `
    <form [formGroup]="postForm" (ngSubmit)="submitForm()" enctype="multipart/form-data">

      <!-- Title -->
      <div class="mb-3">
        <label class="form-label">Post Title</label>
        <input formControlName="title" type="text" class="form-control" />
      </div>

      <!-- Description -->
      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea formControlName="description" class="form-control"></textarea>
      </div>

      <!-- Category -->
      <div class="mb-3">
        <label class="form-label">Blog Category</label>
        <select formControlName="category" class="form-select">
          <option value="">Select Category</option>
          <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Date -->
      <div class="mb-3">
        <label class="form-label">Date</label>
        <input formControlName="date" type="text" class="form-control"  />
      </div>

      <!-- Main File -->
      <div class="mb-3">
        <label class="form-label">Main File (Optional)</label>
        <input type="file" class="form-control" (change)="onMainFileSelected($event)" />
      </div>

      <!-- Links -->
      <div class="mb-3">
        <label class="form-label">Links</label>
        <div *ngFor="let link of links.controls; let i = index"
             [formGroup]="$any(link)"
             class="d-flex mb-2">
          <input formControlName="url" type="text" class="form-control me-2" placeholder="Enter URL" />
          <button type="button" class="btn btn-danger" (click)="removeLink(i)">Remove</button>
        </div>
        <button type="button" class="btn btn-primary mt-1" (click)="addLink()">Add Link</button>
      </div>

      <!-- Sections -->
      <div class="mb-3">
        <label class="form-label">Sections</label>
        <div *ngFor="let section of sections.controls; let i = index"
             [formGroup]="$any(section)"
             class="border p-3 mb-2">
          <div class="mb-2">
            <label class="form-label">Section Title</label>
            <input formControlName="title" type="text" class="form-control" />
          </div>
          <div class="mb-2">
            <label class="form-label">Section Details</label>
            <textarea formControlName="details" class="form-control"></textarea>
          </div>
          <div class="mb-2">
            <label class="form-label">Section Image (Optional)</label>
            <input type="file" class="form-control" (change)="onSectionImageSelected($event, i)" />
          </div>
          <button type="button" class="btn btn-danger" (click)="removeSection(i)">Remove Section</button>
        </div>
        <button type="button" class="btn btn-primary mt-1" (click)="addSection()">Add Section</button>
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-success">Submit Post</button>
    </form>

  `,
  styles: ``
})
export class UploadPost {
  postForm!: FormGroup;
  categories = ['Technology', 'Lifestyle', 'Education', 'Health', 'Business'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }],
      file: [null],
      links: this.fb.array([]),
      sections: this.fb.array([])
    });

    this.addLink();
    this.addSection();
  }

  // ---------------- Links ----------------
  get links(): FormArray {
    return this.postForm.get('links') as FormArray;
  }

  addLink() {
    this.links.push(this.fb.group({ url: ['', Validators.required] }));
  }

  removeLink(index: number) {
    this.links.removeAt(index);
  }

  // ---------------- Sections ----------------
  get sections(): FormArray {
    return this.postForm.get('sections') as FormArray;
  }

  addSection() {
    this.sections.push(
      this.fb.group({
        title: ['', Validators.required],
        details: ['', Validators.required],
        image: [null] // optional
      })
    );
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  onSectionImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      (this.sections.at(index) as FormGroup).patchValue({ image: file });
    }
  }

  onMainFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.postForm.patchValue({ file });
    }
  }

  // ---------------- Form Submission ----------------
  submitForm() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('title', this.postForm.get('title')?.value);
    formData.append('description', this.postForm.get('description')?.value);
    formData.append('category', this.postForm.get('category')?.value);
    formData.append('date', new Date().toISOString());

    const mainFile = this.postForm.get('file')?.value;
    if (mainFile) formData.append('file', mainFile);

    this.links.controls.forEach((linkControl, i) => {
      const link = linkControl as FormGroup;
      formData.append(`links[${i}]`, link.get('url')?.value);
    });

    this.sections.controls.forEach((sectionControl, i) => {
      const section = sectionControl as FormGroup;
      formData.append(`sections[${i}][title]`, section.get('title')?.value);
      formData.append(`sections[${i}][details]`, section.get('details')?.value);
      const img = section.get('image')?.value;
      if (img) formData.append(`sections[${i}][image]`, img);
    });

    console.log('Form Submitted', formData);
  }
}
