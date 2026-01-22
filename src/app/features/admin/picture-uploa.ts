import {Component, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Modal} from '../system/modal';
import {Header} from '../shared/header/header';

@Component({
  selector: 'app-picture-uploa',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    Modal,
    NgIf,
    Header
  ],
  template: `
    <app-header></app-header>
    <h1 class="h3 container mb-4">My Picture </h1>
    <div class="border rounded p-3 p-lg-4">
      <div class="d-flex align-items-center mb-3">
        <div class="ratio ratio-1x1 flex-shrink-0" style="width: 110px">
          <img src="adminIcon/img_4.png" width="110" alt="iPhone 14">
        </div>
        <div class="w-100 min-w-0 ps-2 ps-sm-3">
          <div class="d-flex align-items-center gap-2 mb-2">
            <div class="d-flex gap-1 fs-xs">
              <i class="ci-star-filled text-warning"></i>
              <i class="ci-star-filled text-warning"></i>
              <i class="ci-star-filled text-warning"></i>
              <i class="ci-star-filled text-warning"></i>
              <i class="ci-star text-body-tertiary opacity-75"></i>
            </div>
            <span class="text-body-tertiary fs-xs">68</span>
          </div>
          <h4 class="fs-sm fw-medium mb-2">Explore more images</h4>
          <div class="h5 mb-0">Unlimited Actions</div>
        </div>
      </div>
      <div class="d-flex gap-2 gap-lg-3">
        <button href="https://open.spotify.com/" type="button" class="btn btn-success w-md-25 w-100 animate-slide-end">
          <i class="ci-shopping-cart fs-base animate-target ms-n1 me-2"></i>
          Spotify
        </button>
        <button (click)="this.modal.set(true)"  type="button" class="btn btn-danger w-100 animate-slide-end">
          <i class="ci-shopping-cart fs-base animate-target ms-n1 me-2"></i>
          Upload Picture
        </button>
      </div>
    </div>
    <section class="container pt-5 mt-1 mt-sm-2 mt-md-3 mt-lg-4">

      <div class="row">

        <!-- Banner -->
        <div class="col-lg-4" data-bs-theme="dark">
          <div class="d-flex flex-column align-items-center justify-content-end h-100 text-center overflow-hidden rounded-5 px-4 px-lg-3 pt-4 pb-5" style="background: #1d2c41 url(assets/img/home/electronics/banner/background.jpg) center/cover no-repeat">
            <div class="ratio animate-up-down position-relative z-2 me-lg-4" style="max-width: 320px; margin-bottom: -19%; --cz-aspect-ratio: calc(690 / 640 * 100%)">
              <img src="adminIcon/img_3.png" style="width: 350px; height: 300px; border-radius: 50px" alt="Laptop">
            </div>
            <h3 class="display-2 mb-2 mt-4">Vectors</h3>
            <p class="text-body fw-medium mb-4">Be Pro Anywhere</p>
            <a class="btn btn-sm btn-danger" href="https://www.vecteezy.com/free-photos">
              From $1,199
              <i class="ci-arrow-up-right fs-base ms-1 me-n1"></i>
            </a>
          </div>
        </div>

        <!-- Product list -->
        <div class="col-sm-6 col-lg-4 d-flex flex-column gap-3 pt-4 py-lg-4">

          <!-- Item -->
          <div class="position-relative animate-underline d-flex align-items-center ps-xl-3">
            <div class="ratio ratio-1x1 flex-shrink-0" style="width: 110px">
              <img src="assets/img/shop/electronics/thumbs/01.png" alt="Smart Watch">
            </div>
            <div class="w-100 min-w-0 ps-2 ps-sm-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="d-flex gap-1 fs-xs">
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                </div>
                <span class="text-body-tertiary fs-xs">45</span>
              </div>
              <h4 class="mb-2">
                <a class="stretched-link d-block fs-sm fw-medium text-truncate" href="shop-product-general-electronics.html">
                  <span class="animate-target">Smart Watch Series 7, White</span>
                </a>
              </h4>
              <div class="h5 mb-0">$449.00</div>
            </div>
          </div>

          <!-- Item -->
          <div class="position-relative animate-underline d-flex align-items-center ps-xl-3">
            <div class="ratio ratio-1x1 flex-shrink-0" style="width: 110px">
              <img src="assets/img/shop/electronics/thumbs/03.png" width="110" alt="VR Glasses">
            </div>
            <div class="w-100 min-w-0 ps-2 ps-sm-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="d-flex gap-1 fs-xs">
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-half text-warning"></i>
                  <i class="ci-star text-body-tertiary opacity-75"></i>
                </div>
                <span class="text-body-tertiary fs-xs">123</span>
              </div>
              <h4 class="mb-2">
                <a class="stretched-link d-block fs-sm fw-medium text-truncate" href="shop-product-general-electronics.html">
                  <span class="animate-target">VRB01 Virtual Reality Glasses</span>
                </a>
              </h4>
              <div class="h5 mb-0">$340.99</div>
            </div>
          </div>

          <!-- Item -->
          <div class="position-relative animate-underline d-flex align-items-center ps-xl-3">
            <div class="ratio ratio-1x1 flex-shrink-0" style="width: 110px">
              <img src="assets/img/shop/electronics/thumbs/05.png" width="110" alt="Bluetooth Headphones">
            </div>
            <div class="w-100 min-w-0 ps-2 ps-sm-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="d-flex gap-1 fs-xs">
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star text-body-tertiary opacity-75"></i>
                </div>
                <span class="text-body-tertiary fs-xs">34</span>
              </div>
              <h4 class="mb-2">
                <a class="stretched-link d-block fs-sm fw-medium text-truncate" href="shop-product-general-electronics.html">
                  <span class="animate-target">Wireless Bluetooth Headphones Sony</span>
                </a>
              </h4>
              <div class="h5 mb-0">$357.00</div>
            </div>
          </div>

          <!-- Item -->
          <div class="position-relative animate-underline d-flex align-items-center ps-xl-3">
            <div class="ratio ratio-1x1 flex-shrink-0" style="width: 110px">
              <img src="assets/img/shop/electronics/thumbs/07.png" width="110" alt="MacBook">
            </div>
            <div class="w-100 min-w-0 ps-2 ps-sm-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="d-flex gap-1 fs-xs">
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                </div>
                <span class="text-body-tertiary fs-xs">34</span>
              </div>
              <h4 class="mb-2">
                <a class="stretched-link d-block fs-sm fw-medium text-truncate" href="shop-product-general-electronics.html">
                  <span class="animate-target">Laptop Apple MacBook Pro 13 M2</span>
                </a>
              </h4>
              <div class="h5 mb-0">$1,200.00</div>
            </div>
          </div>
        </div>

        <!-- Product list -->
        <div class="col-sm-6 col-lg-4 d-flex flex-column gap-3 pt-3 py-lg-4">

          <!-- Item -->
          <div class="position-relative animate-underline d-flex align-items-center ps-xl-3">
            <div class="ratio ratio-1x1 flex-shrink-0" style="width: 110px">
              <img src="assets/img/shop/electronics/thumbs/02.png" width="110" alt="iPad Pro">
            </div>
            <div class="w-100 min-w-0 ps-2 ps-sm-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="d-flex gap-1 fs-xs">
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star text-body-tertiary opacity-75"></i>
                </div>
                <span class="text-body-tertiary fs-xs">126</span>
              </div>
              <h4 class="mb-2">
                <a class="stretched-link d-block fs-sm fw-medium text-truncate" href="shop-product-general-electronics.html">
                  <span class="animate-target">Tablet Apple iPad Air M1</span>
                </a>
              </h4>
              <div class="h5 mb-0">$540.00</div>
            </div>
          </div>

          <!-- Item -->
          <div class="position-relative animate-underline d-flex align-items-center ps-xl-3">
            <div class="ratio ratio-1x1 flex-shrink-0" style="width: 110px">
              <img src="assets/img/shop/electronics/thumbs/04.png" width="110" alt="AirPods 2 Pro">
            </div>
            <div class="w-100 min-w-0 ps-2 ps-sm-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="d-flex gap-1 fs-xs">
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                </div>
                <span class="text-body-tertiary fs-xs">340</span>
              </div>
              <h4 class="mb-2">
                <a class="stretched-link d-block fs-sm fw-medium text-truncate" href="shop-product-general-electronics.html"><span class="animate-target">Headphones Apple AirPods 2 Pro</span></a>
              </h4>
              <div class="h5 mb-0">$209.99 <del class="text-body-tertiary fs-sm fw-normal">$356.00</del></div>
            </div>
          </div>

          <!-- Item -->
          <div class="position-relative animate-underline d-flex align-items-center ps-xl-3">
            <div class="ratio ratio-1x1 flex-shrink-0" style="width: 110px">
              <img src="assets/img/shop/electronics/thumbs/06.png" width="110" alt="Power Bank">
            </div>
            <div class="w-100 min-w-0 ps-2 ps-sm-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="d-flex gap-1 fs-xs">
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star text-body-tertiary opacity-75"></i>
                </div>
                <span class="text-body-tertiary fs-xs">29</span>
              </div>
              <h4 class="mb-2">
                <a class="stretched-link d-block fs-sm fw-medium text-truncate" href="shop-product-general-electronics.html">
                  <span class="animate-target">Power Bank PBS 10000 mAh Black</span>
                </a>
              </h4>
              <div class="h5 mb-0">$49.99</div>
            </div>
          </div>

          <!-- Item -->
          <div class="position-relative animate-underline d-flex align-items-center ps-xl-3">
            <div class="ratio ratio-1x1 flex-shrink-0" style="width: 110px">
              <img src="assets/img/shop/electronics/thumbs/08.png" width="110" alt="iPhone 14">
            </div>
            <div class="w-100 min-w-0 ps-2 ps-sm-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <div class="d-flex gap-1 fs-xs">
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                  <i class="ci-star-filled text-warning"></i>
                </div>
                <span class="text-body-tertiary fs-xs">12</span>
              </div>
              <h4 class="mb-2">
                <a class="stretched-link d-block fs-sm fw-medium text-truncate" href="shop-product-general-electronics.html">
                  <span class="animate-target">Apple iPhone 14 128GB White</span>
                </a>
              </h4>
              <div class="h5 mb-0">$899.00 <del class="text-body-tertiary fs-sm fw-normal">$958.00</del></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class=" ">
      <div class="modal-overlay" *ngIf="modal()">
        <app-modal [width]="'600px'" [height]="'600px'" (closeModal)="closeModal()">
          <div class="shadow-none">
            <div class="modal-content">
              <div class=" mb-7">
                <div class="card h-100 shadow-none border-0">
                  <div class="p-1 pb-0" style="height: 500px; overflow-y: scroll">
                    <form [formGroup]="pictureForm" (ngSubmit)="onSubmit()">

                      <!-- Title -->
                      <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" formControlName="title" class="form-control" placeholder="Gallery title">
                      </div>

                      <!-- Description -->
                      <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea formControlName="description" class="form-control" rows="3" placeholder="Gallery description"></textarea>
                      </div>

                      <!-- Images -->
                      <div class="mb-3">
                        <label class="form-label">Select Images</label>
                        <input type="file" class="form-control" (change)="onFilesChange($event)" accept="image/*" multiple>
                      </div>

                      <!-- Preview -->
                      <div class="mb-3" *ngIf="imagePreviews.length > 0">
                        <label class="form-label">Preview</label>
                        <div class="d-flex flex-wrap gap-2">
                          <img *ngFor="let img of imagePreviews" [src]="img" alt="Preview" class="img-thumbnail" style="width: 120px; height: 120px; object-fit: cover;">
                        </div>
                      </div>

                      <!-- Submit -->
                      <button type="submit" class="btn btn-success" [disabled]="pictureForm.invalid">Upload Pictures</button>

                    </form>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </app-modal>
      </div>
    </div>

  `,
  styles:``
})
export class PictureUploa {
  pictureForm: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    images: FormControl<File[] | null>;
  }>;

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  constructor(private fb: FormBuilder) {
    this.pictureForm = this.fb.group({
      title: new FormControl('', { nonNullable: true, validators: Validators.required }),
      description: new FormControl('', { nonNullable: true }),
      images: new FormControl<File[] | null>(null, { validators: Validators.required }),
    });
  }

  onFilesChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
      this.pictureForm.patchValue({ images: this.selectedFiles });

      // Create image previews
      this.imagePreviews = [];
      for (let file of this.selectedFiles) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.pictureForm.valid) {
      console.log('Picture Form Data:', this.pictureForm.value);
      console.log('Selected Files:', this.selectedFiles);
    } else {
      console.log('Form Invalid');
    }
  }

  modal = signal(false);
  closeModal() {
    this.modal.set(false);
  }
}
