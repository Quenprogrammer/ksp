import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Modal} from '../system/modal';
import {NgForOf, NgIf, SlicePipe} from '@angular/common';
import {Header} from '../shared/header/header';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
export interface Event {
  id?: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  date: string;
  time: string;
  location?: string;
  category?: string;
}
@Component({
  selector: 'app-events',
  imports: [
    ReactiveFormsModule,
    Modal,
    NgIf,
    NgForOf,
    Header,
    SlicePipe
  ],
  template: `

    <main class="content-wrapper">

      <section class="position-relative pb-5" style="margin-top: -76px; padding-top: 76px">

        <div class=" position-relative z-1 py-md-3 py-lg-4 py-xl-5">
          <div class="mt-0 mt-md-n4 ">  <app-header [title]="'Event Update'"></app-header></div>

         <div class="container">
          <div class="row pt-4 pt-sm-5 pb-4 pb-md-5 my-2 mt-sm-0 mb-sm-3 mb-md-0 mb-xl-2 mb-xxl-4">
            <div class="col-xl-10 pt-xxl-2">
              <h2 class="display-6 mb-md-4 text-center">Fashion, music, and boutique vibes in one event</h2>
              <p class="fs-lg mb-0">Style & Sound celebrates fashion, live music, and boutique lifestyle with runway shows, performances, and exclusive stalls</p>
            </div>
          </div>


          <div class="row row-cols-2 row-cols-sm-2 row-cols-lg-4 g-4 g-lg-3 g-xl-4 pb-2 mb-4">
            <div class="col" *ngFor="let category of categories">
              <a [href]="category.link" class="vstack position-relative animate-underline hover-effect-scale rounded-4 overflow-hidden text-dark-emphasis fw-medium text-decoration-none">
                <div class="ratio z-2 overflow-hidden" style="--cz-aspect-ratio: calc(130 / 196 * 100%)">
                  <img [src]="category.image" class="hover-effect-target" [alt]="category.title" style="object-fit: cover">
                </div>
                <div class="position-relative z-2 text-center py-3">
                  <div class="animate-target d-inline">{{ category.title }}</div>
                </div>
                <span class="position-absolute top-0 start-0 w-100 h-100 bg-white d-none-dark"></span>
                <span class="position-absolute top-0 start-0 w-100 h-100 bg-white d-none d-block-dark" style="opacity: .07"></span>
              </a>
            </div>
          </div>

         </div>
        </div>

        <!-- Background -->
        <div class="position-absolute top-0 start-0 w-100 h-100 d-none-dark" style="background: linear-gradient(90deg, rgba(203,201,233, .6) 0%, rgba(227,232,251, .6) 50%, rgba(255,224,244, .6) 100%)"></div>
        <div class="position-absolute top-0 start-0 w-100 h-100 d-none d-block-dark" style="background: linear-gradient(90deg, rgba(51,51,59, .6) 0%, rgba(44,48,62, .6) 50%, rgba(57,43,52, .6) 100%)"></div>
      </section>

      <!-- Posts list + Sidebar -->
      <section class="container pt-3  mb-2 mb-md-3 mb-lg-4 mb-xl-5">
        <div class="page-header my-3">
          <div class="row align-items-end mb-3">
            <div class="col-sm mb-2 mb-sm-0">


              <h4 class="page-header-title">Recent Events</h4>
            </div>
            <!-- End Col -->

            <div class="col-sm-auto">
              <!-- Nav -->
              <ul class="nav nav-segment" id="leaderboardTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="btn btn-dark me-2 mb-3" (click)="modal.set(true)">Upload Event</button>
                </li>


              </ul>
              <!-- End Nav -->
            </div>
            <!-- End Col -->
          </div>
          <!-- End Row -->
        </div>
 </section>
      <section class="container   pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5">
      <div class="row mt-3">

        <!-- Posts list -->
        <div class="col">
          <div class="d-flex flex-column gap-4 mt-n3 mb-3">

            <div class="card   shadow-lg">
              <article class="row align-items-start align-items-md-center gx-0 gy-4 ">
                <div class="col-md-5 ">
                  <a class="ratio d-flex hover-effect-scale rounded overflow-hidden flex-md-shrink-0" href="blog-single-v1.html" style="--cz-aspect-ratio: calc(226 / 306 * 100%)">
                    <img src="assets/img/blog/list/04.jpg" class="hover-effect-target  " alt="Image" style="border-radius: 0">
                  </a>
                </div>
                <div class="col-md-7">
                  <div class="p-3">
                    <div class="nav align-items-center gap-2 pb-2 mt-n1 mb-1">
                      <a class="nav-link text-body fs-xs text-uppercase p-0" href="#!">Tech tips</a>
                      <hr class="vr my-1 mx-1">
                      <span class="text-body-tertiary fs-xs">September 11, 2024</span>
                    </div>
                    <h3 class="h5 mb-2 mb-md-3">
                      <a class="hover-effect-underline" href="blog-single-v1.html">
                        {{ "Optimizing your workspace: The guide to an efficient and minimalist desk setup" | slice:0:30 }}...
                      </a>
                    </h3>


                    <p class="mb-0">Creating an efficient and minimalist workspace is not just about decluttering, it's about cultivating an environment that...</p>

                  </div>
                </div>
              </article>

            </div>

            <!-- Article -->
          </div>

          <hr class="mt-4 mt-sm-5">

          <!-- Pagination -->
          <nav aria-label="Blog pages">
            <ul class="pagination pagination-lg">
              <li class="page-item active" aria-current="page">
                  <span class="page-link">
                    1
                    <span class="visually-hidden">(current)</span>
                  </span>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">2</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">3</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">4</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">5</a>
              </li>
            </ul>
          </nav>
        </div>



      </div>
      </section>
    </main>


    <div class="modal-overlay" *ngIf="modal()">
      <app-modal [width]="'600px'" [height]="'600px'" (closeModal)="closeModal()">
        <div class="shadow-none">
          <div class="modal-content">
            <div class=" mb-7">
              <div class="card h-100 shadow-none border-0">
                <div class="p-1 pb-0" style="height: 500px; overflow-y: scroll">


                  <form [formGroup]="eventForm" (ngSubmit)="submitEvent()" enctype="multipart/form-data" class="p-4 border rounded shadow-sm">

                    <h3 class="mb-4 text-center">Upload Event</h3>

                    <!-- Event Title -->
                    <div class="mb-3">
                      <label for="title" class="form-label">Event Title</label>
                      <input type="text" id="title" formControlName="title" class="form-control" placeholder="Enter event title" required>
                    </div>

                    <!-- Event Description -->
                    <div class="mb-3">
                      <label for="description" class="form-label">Event Description</label>
                      <textarea id="description" formControlName="description" class="form-control" rows="4" placeholder="Enter event description" required></textarea>
                    </div>

                    <!-- Event Image -->
                    <div class="mb-3">
                      <label for="image" class="form-label">Event Image</label>
                      <input type="file" id="image" (change)="onImageSelected($event)" class="form-control" accept="image/*" required>
                      <div *ngIf="previewImage" class="mt-2 text-center">
                        <img [src]="previewImage" alt="Preview" class="img-thumbnail" style="max-height: 200px;">
                      </div>
                    </div>

                    <!-- Event Link -->
                    <div class="mb-3">
                      <label for="link" class="form-label">Event Link</label>
                      <input type="url" id="link" formControlName="link" class="form-control" placeholder="Enter event URL">
                    </div>

                    <!-- Event Date -->
                    <div class="mb-3">
                      <label for="date" class="form-label">Event Date</label>
                      <input type="date" id="date" formControlName="date" class="form-control" required>
                    </div>

                    <!-- Event Time -->
                    <div class="mb-3">
                      <label for="time" class="form-label">Event Time</label>
                      <input type="time" id="time" formControlName="time" class="form-control" required>
                    </div>

                    <!-- Event Location -->
                    <div class="mb-3">
                      <label for="location" class="form-label">Event Location</label>
                      <input type="text" id="location" formControlName="location" class="form-control" placeholder="Enter event location">
                    </div>

                    <!-- Event Category -->
                    <div class="mb-3">
                      <label for="category" class="form-label">Event Category</label>
                      <select id="category" formControlName="category" class="form-select">
                        <option value="" disabled selected>Select category</option>
                        <option value="conference">Conference</option>
                        <option value="workshop">Workshop</option>
                        <option value="webinar">Webinar</option>
                        <option value="concert">Concert</option>
                        <option value="meetup">Meetup</option>
                      </select>
                    </div>

                    <!-- Submit Button -->
                    <div class="text-center">
                      <button type="submit" class="btn btn-primary w-50" [disabled]="eventForm.invalid">Upload Event</button>
                    </div>

                  </form>


                </div>
              </div>
            </div>
          </div>
        </div>
      </app-modal>
    </div>
  `,
  styles:``
})
export class EventsUpload {
  eventForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      link: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: [''],
      category: [''],
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.eventForm.patchValue({ image: file });
      this.eventForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitEvent() {
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
      // Handle submission, e.g., send to Firebase or backend API
    }
  }

  modal = signal(false);
  closeModal() {
    this.modal.set(false);
  }
  categories = [
    {
      title: 'Fashion',
      image: 'assets/img/home/fashion/v1/popular/01.jpg',
      link: 'shop-catalog-fashion.html'
    },
    {
      title: 'Music',
      image: 'event/img.png',
      link: 'shop-catalog-music.html'
    },
    {
      title: 'Boutique',
      image: 'assets/img/shop/marketplace/02.jpg',
      link: 'shop-catalog-boutique.html'
    },
    {
      title: 'Accessories',
      image: 'assets/img/blog/grid/v1/01.jpg',
      link: 'shop-catalog-accessories.html'
    },

  ];

  private firestore = inject(Firestore);

  events: Event[] = [];
  loading = true;

  ngOnInit(): void {
    const eventsRef = collection(this.firestore, 'events');

    // ✅ Cast the result as Event[]
    collectionData(eventsRef, { idField: 'id' }).subscribe(
      (data) => {
        this.events = data as Event[]; // <-- cast here
        this.loading = false;
      },
      (err) => {
        console.error('Error loading events:', err);
        this.loading = false;
      }
    );
  }
}
